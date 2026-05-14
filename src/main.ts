import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 
  app.enableCors(); // CORS'u etkinleştirerek farklı kaynaklardan gelen isteklerin kabul edilmesini sağlıyoruz
  
  // 0.0.0.0 ekleyerek tüm ağ cihazlarına kapıyı açıyoruz
  await app.listen(3000, '0.0.0.0'); 
  console.log(`Uygulama şu adreste çalışıyor: ${await app.getUrl()}`);
}
bootstrap();