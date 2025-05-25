import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLExceptionFilter } from './common/filters/graphql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useGlobalFilters(new GraphQLExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:3001', // ✅ Cho phép FE truy cập từ cổng 3001
    credentials: true, // ✅ Cho phép gửi cookie nếu cần
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
