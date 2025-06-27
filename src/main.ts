import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLExceptionFilter } from './common/filters/graphql-exception.filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 👇 ép kiểu về NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Các config như cũ
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // ✅ Serve thư mục uploads nằm ở gốc dự án (cùng cấp src/)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // URL truy cập sẽ là http://localhost:3000/uploads/filename.png
  });
  app.useGlobalFilters(new GraphQLExceptionFilter());

  app.enableCors({
    origin: "http://localhost:3001",
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
