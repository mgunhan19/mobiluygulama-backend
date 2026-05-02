import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // BU SATIR KRİTİK: Mobil cihazın bağlanması için şart!
  app.enableCors(); 
  
  // 0.0.0.0 ekleyerek tüm ağ cihazlarına kapıyı açıyoruz
  await app.listen(3000, '0.0.0.0'); 
  console.log(`Uygulama şu adreste çalışıyor: ${await app.getUrl()}`);
}
bootstrap();