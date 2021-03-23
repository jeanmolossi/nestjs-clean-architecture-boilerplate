import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', '..', '..', '..', 'tmp', 'uploads'),
      serveRoot: '/static',
      exclude: ['./src', './dist'],
    }),
  ],
  exports: [ServeStaticModule],
})
export class ServeStaticFilesModule {}
