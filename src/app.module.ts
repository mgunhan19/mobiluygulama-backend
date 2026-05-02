import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Kendi kullanıcı adın
      password: '1905.1905', // Kendi şifren
      database: 'bildin_bildin',
      entities: [User],
      synchronize: true, // Geliştirme aşamasında tabloyu otomatik oluşturur
    }),
    UserModule,
  ],
})
export class AppModule {}