import { CreateUserEntityPayload } from '@/core/domain/user/entity/type/CreateUserEntityPayload';
import { User } from '@/core/domain/user/entity/User';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';
import { mockCreateUserEntityPayload } from '../../mocks';

async function createUser(): Promise<User> {
  const createUserEntityPayload: CreateUserEntityPayload = mockCreateUserEntityPayload();

  return User.new(createUserEntityPayload);
}

describe('UserUseCaseDTO', () => {
  describe('newFromUser', () => {
    test('Espere que ele crie uma instância UserUseCaseDTO com os parâmetros necessários', async () => {
      const user: User = await createUser();
      const userUseCaseDto: UserUseCaseDTO = UserUseCaseDTO.newFromUser(user);

      const userInfo = user.getUserInfo();

      expect(userUseCaseDto.id).toBe(userInfo.id);
      expect(userUseCaseDto.email).toBe(userInfo.email);
      expect(userUseCaseDto.role).toBe(userInfo.role);
    });
  });

  describe('newListFromUsers', () => {
    test('Espere que ele crie instâncias UserUseCaseDTO com os parâmetros necessários', async () => {
      const user: User = await createUser();
      const userUseCaseDtos: UserUseCaseDTO[] = UserUseCaseDTO.newListFromUsers(
        [user],
      );

      const userInfo = user.getUserInfo();

      expect(userUseCaseDtos.length).toBe(1);
      expect(userUseCaseDtos[0].id).toBe(userInfo.id);
      expect(userUseCaseDtos[0].email).toBe(userInfo.email);
      expect(userUseCaseDtos[0].role).toBe(userInfo.role);
    });
  });
});
