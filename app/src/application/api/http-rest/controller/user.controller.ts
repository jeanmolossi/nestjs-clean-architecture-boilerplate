import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserRoles } from '@/core/common';
import { CoreApiResponse } from '@/core/common/api/CoreApiResponse';
import { FindUserUseCase, UserDITokens } from '@/core/domain/user';
import { CreateUserUseCase } from '@/core/domain/user/usecase/CreateUserUseCase';
import { UserUseCaseDTO } from '@/core/domain/user/usecase/dto/UserUseCaseDTO';
import { FindAllUsersUseCase } from '@/core/domain/user/usecase/FindAllUsersUseCase';
import { UpdateUserUseCase } from '@/core/domain/user/usecase/UpdateUserUseCase';
import { CreateUserAdapter } from '@/infrastructure/adapter/usecase/user/CreateUserAdapter';
import { UpdateUserAdapter } from '@/infrastructure/adapter/usecase/user/UpdateUserAdapter';
import { UserFiltersAdapter } from '@/infrastructure/adapter/usecase/user/UserFiltersAdapter';
import { HttpAuth } from '../auth/decorator/HttpAuth';
import { HttpRestApiModelArrayData } from './documentation/user/HttpRestApiModelArrayData';
import { HttpRestApiModelBadRequest } from './documentation/user/HttpRestApiModelBadRequest';
import { HttpRestApiModelCreateUserBody } from './documentation/user/HttpRestApiModelCreateUserBody';
import { HttpRestApiModelData } from './documentation/user/HttpRestApiModelData';
import { HttpRestApiModelNotFound } from './documentation/user/HttpRestApiModelNotFound';
import { HttpRestApiModelUpdateUserBody } from './documentation/user/HttpRestApiModelUpdateUserBody';
import { HttpRestApiUserFilters } from './documentation/user/HttpRestApiUserFilters';

@Controller('api/user')
@ApiTags('api/user')
export class UserController {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(UserDITokens.FindUserUseCase)
    private readonly findUserUseCase: FindUserUseCase,

    @Inject(UserDITokens.FindAllUsersUseCase)
    private readonly findAllUsersUseCase: FindAllUsersUseCase,

    @Inject(UserDITokens.UpdateUserUseCase)
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @HttpAuth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.AIRPLANE)
  @ApiBearerAuth()
  @ApiBody({ type: HttpRestApiModelCreateUserBody })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: HttpRestApiModelData,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    type: HttpRestApiModelBadRequest,
  })
  async createAccount(
    @Body() user: HttpRestApiModelCreateUserBody,
  ): Promise<CoreApiResponse<UserUseCaseDTO>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.new(user);

    const createdUser: UserUseCaseDTO = await this.createUserUseCase.execute(
      adapter,
    );

    return CoreApiResponse.success(
      createdUser,
      HttpStatus.CREATED,
      'Usuário criado com sucesso',
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ status: HttpStatus.OK, type: HttpRestApiModelData })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    type: HttpRestApiModelNotFound,
  })
  async findUser(
    @Query() filters: HttpRestApiUserFilters,
  ): Promise<CoreApiResponse<UserUseCaseDTO>> {
    const adapter: UserFiltersAdapter = await UserFiltersAdapter.new(filters);

    const foundUser: UserUseCaseDTO = await this.findUserUseCase.execute(
      null,
      adapter,
    );

    return CoreApiResponse.success(foundUser);
  }

  @Get('all')
  @HttpAuth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: HttpRestApiModelArrayData,
  })
  async findAllUsers(
    @Query() filters: HttpRestApiUserFilters,
  ): Promise<CoreApiResponse<UserUseCaseDTO[]>> {
    const adapter: UserFiltersAdapter = await UserFiltersAdapter.new(filters);

    const users: UserUseCaseDTO[] = await this.findAllUsersUseCase.execute(
      null,
      adapter,
    );

    return CoreApiResponse.success(users);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id do usuário para atualizar',
    example: '5dcb2455-2d03-439f-97e2-9bb48fbe291d',
  })
  @ApiBody({ type: HttpRestApiModelUpdateUserBody })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: HttpRestApiModelData,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() userData: HttpRestApiModelUpdateUserBody,
  ): Promise<CoreApiResponse<UserUseCaseDTO>> {
    const adapter: UpdateUserAdapter = await UpdateUserAdapter.new({
      ...userData,
      id,
    });

    const user: UserUseCaseDTO = await this.updateUserUseCase.execute(adapter);

    return CoreApiResponse.success(user);
  }
}
