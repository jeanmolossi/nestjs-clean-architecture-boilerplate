/**
 * @section USECASES
 * @arg {Symbol} CreateUserUseCase - Symbol
 * @arg {Symbol} FindUserByIdUseCase - Symbol
 * @arg {Symbol} FindAllUsersUseCase - Symbol
 * @arg {Symbol} UpdateUserUseCase - Symbol
 * @section HANDLERS
 * @arg {Symbol} UserCapabilitiesUpdatedEventHandler - Symbol
 * @arg {Symbol} GetPreviewUserQueryHandler - Symbol
 * @section PERSISTENCE
 * @arg {Symbol} UserRepository - Symbol
 * @arg {Symbol} UserCapabilitiesRepository - Symbol
 * */
export class UserDITokens {
  /** @section UseCases */
  public static readonly CreateUserUseCase: unique symbol = Symbol(
    'CreateUserUseCase',
  );

  public static readonly FindUserUseCase: unique symbol = Symbol(
    'FindUserUseCase',
  );

  public static readonly FindAllUsersUseCase: unique symbol = Symbol(
    'FindAllUsersUseCase',
  );

  public static readonly UpdateUserUseCase: unique symbol = Symbol(
    'UpdateUserUseCase',
  );

  public static readonly DeleteUserUseCase: unique symbol = Symbol(
    'DeleteUserUseCase',
  );

  /** @section {Handlers} */

  /** @section Repositoryies */

  public static readonly UserRepository: unique symbol = Symbol(
    'UserRepository',
  );
}
