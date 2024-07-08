import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseHandlerInterceptor } from './response-handler/response-handler.interceptor';
import { PreconditionFailedException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { PrismaClientExceptionFilter } from './exception/prisma-known-exception.filter';
import { GlobalExceptionFilter } from './exception/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new PreconditionFailedException(
          validationErrors.map((error) => {
            if (error.children && error.children.length) {
              return {
                field: error.property,
                error: error.children.map((e) => ({
                  field: e.property,
                  error: Object.values(e.constraints)[0],
                })),
              };
            }
            return {
              field: error.property,
              error: Object.values(error.constraints)[0],
            };
          }),
        );
      },
    }),
  );

  const appConfig = app.get(ConfigService).get('appConfig');

  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalFilters(new GlobalExceptionFilter());
  // app.useGlobalInterceptors(new ResponseHandlerInterceptor());

  app.setGlobalPrefix('/api/v1/auth');
  const port = appConfig.PORT || 4000;
  await app.listen(port, () => {
    console.log(`🚀 Server is up and running on http://localhost:${port}`);
  });
}
bootstrap();
