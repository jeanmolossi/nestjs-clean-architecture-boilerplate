import {
  Global,
  Module,
  OnApplicationBootstrap,
  Provider,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { NestHttpExceptionFilter } from '@/application/api/http-rest/exception-filter/NestHttpExceptionFilter';
import { CoreDITokens } from '@/core/common/di/CoreDITokens';
import { NestCommandBusAdapter } from '@/infrastructure/adapter/message/NestCommandBusAdapter';
import { NestEventBusAdapter } from '@/infrastructure/adapter/message/NestEventBusAdapter';
import { NestQueryBusAdapter } from '@/infrastructure/adapter/message/NestQueryBusAdapter';
import { TypeOrmUser } from '@/infrastructure/adapter/persistence/typeorm/user/user.entity';
import { EnvironmentModule } from '@/infrastructure/config/environment/environment.module';
import { MulterUploadModule } from '@/infrastructure/config/multer/multer.module';
import { ServeStaticFilesModule } from '@/infrastructure/config/serve-static/serve-static.module';
import { TypeOrmConfigModule } from '@/infrastructure/config/typeorm/typeorm-config.module';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: NestHttpExceptionFilter,
  },
  {
    provide: CoreDITokens.CommandBus,
    useClass: NestCommandBusAdapter,
  },
  {
    provide: CoreDITokens.QueryBus,
    useClass: NestQueryBusAdapter,
  },
  {
    provide: CoreDITokens.EventBus,
    useClass: NestEventBusAdapter,
  },
];

@Global()
@Module({
  imports: [
    CqrsModule,
    TypeOrmConfigModule,
    EnvironmentModule,
    MulterUploadModule,
    ServeStaticFilesModule,
  ],
  providers,
  exports: [
    CoreDITokens.CommandBus,
    CoreDITokens.QueryBus,
    CoreDITokens.EventBus,
    EnvironmentModule,
    MulterUploadModule,
  ],
})
export class InfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
  }
}
