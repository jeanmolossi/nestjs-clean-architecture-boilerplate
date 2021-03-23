import { ClassValidationDetails, Code, Entity, Exception } from '@/core/common';
import { IsString } from 'class-validator';
import { v4 } from 'uuid';

class MockEntity extends Entity<string> {
  @IsString()
  public name: string;

  constructor({ id, name }: { id: string; name: string }) {
    super();

    this.id = id;
    this.name = name;
  }
}

describe('Entity', () => {
  describe('getId', () => {
    test('Se o ID estiver definido deve retornar o id', async () => {
      const id: string = v4();
      const entity: MockEntity = new MockEntity({
        id,
        name: 'John doe',
      });

      expect(entity.getId()).toBe(id);
    });

    test('Se o ID não estiver definido, deve lançar uma Exceção', async () => {
      const id: unknown = undefined;
      const entity: MockEntity = new MockEntity({
        id: id as string,
        name: 'John doe',
      });

      expect.hasAssertions();

      try {
        entity.getId();
      } catch (e) {
        const exception: Exception<void> = e;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
        expect(exception.message).toBe('MockEntity: O ID está vazio.');
      }
    });
  });

  describe('validate', () => {
    test('Quando a Entity é valida, espero que isso não dê uma Exceção', async () => {
      const validEntity: MockEntity = new MockEntity({
        id: v4(),
        name: 'John doe',
      });

      await expect(validEntity.validate()).resolves.toBeUndefined();
    });

    test('Quando a Entity não é válida, deve lançar uma Exceção', async () => {
      const name: unknown = 42;

      const invalidEntity: MockEntity = new MockEntity({
        id: v4(),
        name: name as string,
      });

      expect.hasAssertions();

      try {
        await invalidEntity.validate();
      } catch (e) {
        const exception: Exception<ClassValidationDetails> = e;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.ENTITY_VALIDATION_ERROR.code);
        expect(exception.data!.errors[0].property).toBe('name');
      }
    });
  });
});
