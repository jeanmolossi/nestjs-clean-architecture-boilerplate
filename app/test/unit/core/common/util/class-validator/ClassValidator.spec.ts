import { Optional } from '@/core/common/type/CommonTypes';
import {
  ClassValidationDetails,
  ClassValidator,
} from '@/core/common/util/class-validator/ClassValidator';
import { IsNumber, IsString } from 'class-validator';

class MockClass {
  @IsString()
  public stringProperty: string;

  @IsNumber()
  public numberProperty: number;

  constructor(stringProperty: string, numberProperty: number) {
    this.stringProperty = stringProperty;
    this.numberProperty = numberProperty;
  }
}

describe('ClassValidator', () => {
  describe('validate', () => {
    test('Quando MockClass é válido, espera que não retorne detalhes de validação', async () => {
      const validInstance: MockClass = new MockClass('42', 42);
      await expect(
        ClassValidator.validate(validInstance),
      ).resolves.toBeUndefined();
    });

    test('Quando MockClass não é válido, ele retorna um objeto com detalhes de validação', async () => {
      const stringProperty: unknown = 42;
      const numberProperty: unknown = '42';

      const invalidInstance: MockClass = new MockClass(
        stringProperty as string,
        numberProperty as number,
      );
      const validationDetails: Optional<ClassValidationDetails> = await ClassValidator.validate(
        invalidInstance,
      );

      expect(validationDetails).toBeDefined();
      expect(validationDetails!.context).toBe('MockClass');
      expect(validationDetails!.errors[0].property).toBe('stringProperty');
      expect(validationDetails!.errors[1].property).toBe('numberProperty');
    });
  });
});
