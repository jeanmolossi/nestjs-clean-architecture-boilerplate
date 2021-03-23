import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OpenAPIObject, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@/application/dependency-injection/app.module';
import { EnvironmentService } from '@/infrastructure/config/environment/environment.service';
import cors from 'cors';

const myCors = cors();

export class ServerApplication {
  constructor(private environmentService: EnvironmentService) {}

  public async run(): Promise<void> {
    const port = this.environmentService.get('API_PORT') || 3000;
    const app: NestExpressApplication = await NestFactory.create(AppModule);

    this.buildAPIDocumentation(app);
    app.use(myCors);

    await app.listen(port);
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title = this.environmentService.get('API_TITLE');
    const description = this.environmentService.get('API_DESCRIPTION');
    const version = this.environmentService.get('API_VERSION');

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('documentation', app, document);
  }

  public static new(): ServerApplication {
    const environmentService = new EnvironmentService();
    return new ServerApplication(environmentService);
  }
}
