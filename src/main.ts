// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // yolun doğru olduğundan emin ol
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS'u etkinleştir (Farklı cihazlardan erişim için şart)
  app.enableCors();

  // 2. Render gibi bulut servislerinin verdiği portu (process.env.PORT) kullan, yoksa 3000
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
console.log(`Uygulama port 3000 üzerinden çalışıyor. IP adresinle bağlanabilirsin.`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();