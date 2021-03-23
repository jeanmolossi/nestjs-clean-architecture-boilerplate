import { Injectable } from '@nestjs/common';

export interface IEnvironmentConfig {
  [key: string]: string;
}

@Injectable()
export class EnvironmentService {
  private readonly environmentConfig: IEnvironmentConfig;

  constructor() {
    this.environmentConfig = EnvironmentService.validateInput({
      ...process.env,
    });
  }

  private static validateInput(
    environmentConfig: IEnvironmentConfig,
  ): IEnvironmentConfig {
    const {
      NODE_ENV,

      API_TITLE,
      API_DESCRIPTION,
      API_VERSION,
      API_PORT,

      DATABASE_PORT,
      DATABASE_USER,
      DATABASE_PASS,
      DATABASE_DBNAME,
      DATABASE_HOST,
      ACCESS_TOKEN_HEADER,
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_TTL_IN_MINUTES,

      LOGIN_USERNAME_FIELD,
      LOGIN_PASSWORD_FIELD,
      
      AWS_S3_BUCKET,
      AWS_REGION,
      AWS_KEY_ID,
      AWS_SECRET_KEY,
    } = environmentConfig;

    const envVarsSchema = {
      API_TITLE: API_TITLE,
      API_DESCRIPTION,
      API_VERSION,
      API_PORT: API_PORT || '3001',
      
      DATABASE_PORT: DATABASE_PORT || '5432',
      DATABASE_USER: DATABASE_USER || 'postgres',
      DATABASE_PASS: DATABASE_PASS || 'docker',
      DATABASE_DBNAME: DATABASE_DBNAME || 'postgres',
      DATABASE_HOST: DATABASE_HOST || 'localhost',
      
      ACCESS_TOKEN_HEADER: ACCESS_TOKEN_HEADER || 'Authorization',
      ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET || 'SeCrEt123-Fallback',
      ACCESS_TOKEN_TTL_IN_MINUTES: ACCESS_TOKEN_TTL_IN_MINUTES || '15',
      LOGIN_USERNAME_FIELD: LOGIN_USERNAME_FIELD || 'email',
      LOGIN_PASSWORD_FIELD: LOGIN_PASSWORD_FIELD || 'password',
      NODE_ENV: NODE_ENV || 'production',
      AWS_S3_BUCKET,
      AWS_REGION,
      AWS_KEY_ID,
      AWS_SECRET_KEY,
    };

    return envVarsSchema;
  }

  get(key: string): string {
    return this.environmentConfig[key];
  }
}
