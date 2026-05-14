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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1905.1905',
      database: 'bildin_bildin',
      entities: [User, Question], // Artık yolu doğru bulduğu için hata vermeyecek
      synchronize: true, 
    }),
    UserModule,
    QuestionModule,
  ],
})
export class AppModule {}