import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';// UserModule'ü de ekliyoruz
// BURAYA DİKKAT: Dosya yolunu 'src/user/questions' olarak güncelle
import { Question } from './user/questions/question.entity'; // Question entity'sini de ekliyoruz
import { QuestionModule } from './user/questions/question.module'; // QuestionModule'ü de ekliyoruz

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:1905.1905@localhost:5432/bildin_bildin',
      entities: [User, Question], // Artık yolu doğru bulduğu için hata vermeyecek
      synchronize: true, 
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }),
    UserModule,
    QuestionModule,
  ],
})
export class AppModule {}