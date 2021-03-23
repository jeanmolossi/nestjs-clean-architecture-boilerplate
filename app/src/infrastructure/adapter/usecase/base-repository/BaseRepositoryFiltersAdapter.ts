import { UseCaseValidatableAdapter } from '@/core/common';
import { StatusEnums } from '@/core/common/enums/StatusEnums';
import {
  IDefaultFilters,
  NonFunctionProperties,
} from '@/core/common/port/persisters/WithFiltersRepositoryPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsUUID,
} from 'class-validator';

@Exclude()
export class BaseRepositoryFiltersAdapter<Entity>
  extends UseCaseValidatableAdapter
  implements IDefaultFilters<Entity> {
  @Expose()
  @IsDateString()
  @IsOptional()
  from?: Date;

  @Expose()
  @IsDateString()
  @IsOptional()
  to?: Date;

  @Expose()
  @IsEnum(StatusEnums, {
    message: 'O status deve ser um valor válido do schema',
  })
  @IsOptional()
  status?: StatusEnums;

  @Expose()
  @IsOptional()
  withRelation?: string[];

  @Expose()
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @Expose()
  @IsOptional()
  order?: NonFunctionProperties<Entity>;

  @Expose()
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  take?: number;

  protected async new<NEntity>(
    payload?: IDefaultFilters<NEntity>,
  ): Promise<BaseRepositoryFiltersAdapter<NEntity>> {
    const adapter: BaseRepositoryFiltersAdapter<NEntity> = plainToClass(
      BaseRepositoryFiltersAdapter,
      payload,
    );

    await adapter.validate();

    adapter.makeRelation(payload.withRelation);

    return adapter;
  }

  protected makeRelation(relations?: string[]): void {
    Object.assign(this, {
      withRelation: relations?.toString().split(','),
    });
  }

  protected makePagination(filters?: IDefaultFilters<Entity>): void {
    if (filters.limit) Object.assign(this, { limit: Number(filters.limit) });
    if (filters.page) Object.assign(this, { page: Number(filters.page) });
  }
}
