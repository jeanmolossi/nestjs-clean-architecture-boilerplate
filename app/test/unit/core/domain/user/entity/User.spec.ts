import { UserRoles } from '@/core/common/enums/UserEnums';
import { CreateUserEntityPayload } from '@/core/domain/user/entity/type/CreateUserEntityPayload';
import { User } from '@/core/domain/user/entity/User';
import { v4 } from 'uuid';
import { mockCreateUserEntityPayload, mockUserEntity } from '../mocks';

describe('User', () => {
  describe('new', () => {
    test('Quando os argumentos opcionais de entrada estão vazios,\n\tespera-se que ele crie uma instância de usuário com parâmetros padrão', async () => {
      const createUserEntityPayload: CreateUserEntityPayload = mockCreateUserEntityPayload();

      const user: User = await User.new(createUserEntityPayload);

      const userInfo = user.getUserInfo();

      expect(typeof user.getId() === 'string').toBeTruthy();
      expect(userInfo.email).toBe(createUserEntityPayload.email);
      expect(userInfo.role).toBe(createUserEntityPayload.role);
    });

    test('Quando argumentos opcionais de entrada são definidos,\n\tespera-se que ele crie uma instância de usuário com parâmetros personalizados', async () => {
      const customId: string = v4();
      const customCreatedAt: Date = new Date(Date.now() - 3000);
      const customEditedAt: Date = new Date(Date.now() - 2000);

      const createUserEntityPayload: CreateUserEntityPayload = {
        ...mockCreateUserEntityPayload(customId),
        created_at: customCreatedAt,
        updated_at: customEditedAt,
      };

      const user: User = await User.new(createUserEntityPayload);

      const userInfo = user.getUserInfo();

      expect(typeof user.getId() === 'string').toBeTruthy();
      expect(userInfo.email).toBe(createUserEntityPayload.email);
      expect(userInfo.role).toBe(createUserEntityPayload.role);
    });
  });

  describe('validatePassword', () => {
    test('Quando a senha estiver correta, espere que ela retorne TRUE', async () => {
      const password: string = v4();

      const user: User = await mockUserEntity({
        name: 'John',
        lastName: 'Doe',
        cpf: '12312312312',
        email: 'guest@email.com',
        role: UserRoles.ADMIN,
        password,
      });

      expect(user.validatePassword(password)).toBeTruthy();
    });

    test('Quando a senha não está correta, espere que ela retorne FALSE', async () => {
      const password: string = v4();
      const incorrectPassword: string = password + v4();

      const user: User = await mockUserEntity({ password });

      expect(user.validatePassword(incorrectPassword)).toBeFalsy();
    });
  });
});
