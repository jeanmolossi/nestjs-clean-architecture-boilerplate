import { Module } from '@nestjs/common';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';
import { makeMulterStorage } from './multer.dev';
import { makeMulterS3Storage } from './multer.prod';

function makeMulterFactory(
  environmentService: EnvironmentService,
): MulterModuleOptions {
  const NODE_ENV = environmentService.get('NODE_ENV') || 'development';

  const { storage, dest } =
    NODE_ENV === 'development'
      ? makeMulterStorage()
      : makeMulterS3Storage(environmentService);

  return {
    dest,
    storage,
  };
}

const MULTER_MODULE = MulterModule.registerAsync({
  imports: [EnvironmentModule],
  inject: [EnvironmentService],
  useFactory: makeMulterFactory,
});

@Module({
  imports: [MULTER_MODULE],
  exports: [MulterModule],
})
export class MulterUploadModule {}
