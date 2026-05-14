import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service'; // Bunu ekle
import { UserController } from './user.controller'; // Bunu ekle

@Module({
  imports: [TypeOrmModule.forFeature([User])],// Veritabanında User tablosunu kullanmak için TypeOrmModule'a ekliyoruz
  providers: [UserService],    // Mantık işlemlerini yapan sınıf
  controllers: [UserController], // API isteklerini karşılayan sınıf
  exports: [UserService],       // Diğer modüller ihtiyaç duyarsa diye dışa açıyoruz
})
export class UserModule {}