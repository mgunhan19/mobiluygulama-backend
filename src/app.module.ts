// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Bilgisayarında çalışıyorsa localhost
      port: 5432, // PostgreSQL varsayılan portu
      username: 'postgres', // Kendi kullanıcı adın
      password: 'şifren', // Kendi şifren
      database: 'bildin_bildin', // Oluşturduğun DB ismi
      entities: [User], // Kullanacağımız entity [cite: 108]
      synchronize: true, // Geliştirme aşamasında tabloyu otomatik oluşturur
    }),
    UserModule,
  ],
})
export class AppModule {}
