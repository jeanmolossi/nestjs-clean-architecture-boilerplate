import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

export const getTypeOrmModuleOptions = (
  environmentConfig: EnvironmentService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: environmentConfig.get('DATABASE_HOST') || 'database',
  port: Number(environmentConfig.get('DATABASE_PORT')) || 5432,
  username: environmentConfig.get('DATABASE_USER'),
  password: environmentConfig.get('DATABASE_PASS'),
  database: environmentConfig.get('DATABASE_DBNAME'),
  entities: [
    `${resolve(
      __dirname,
      '..',
      '..',
      'adapter',
      'persistence',
      'typeorm',
    )}/**/*{.entity,-entity}{.ts,.js}`,
  ],
  logging: true,
});

export const getTypeOrmMigrationsOptions = (
  environmentConfig: EnvironmentService,
): TypeOrmModuleOptions => ({
  ...getTypeOrmModuleOptions(environmentConfig),
  entities: [
    `dist/src/infrastructure/adapter/persistence/typeorm/**/*.entity.{ts,js}`,
  ],
  migrations: [`database/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `database/migrations`,
  },
});

export const TYPEORM_MODULE = TypeOrmModule.forRootAsync({
  imports: [EnvironmentModule],
  inject: [EnvironmentService],
  useFactory: getTypeOrmModuleOptions,
});

@Module({
  imports: [TYPEORM_MODULE],
})
export class TypeOrmConfigModule {}
