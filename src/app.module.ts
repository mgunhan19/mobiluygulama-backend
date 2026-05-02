import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
// BURAYA DİKKAT: Dosya yolunu 'src/user/questions' olarak güncelle
import { Question } from './user/questions/question.entity'; 
import { QuestionModule } from './user/questions/question.module'; 

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