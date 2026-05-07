import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],// Veritabanında Question tablosunu kullanmak için TypeOrmModule'a ekliyoruz
  providers: [QuestionService],// Mantık işlemlerini yapan sınıf
  controllers: [QuestionController],// API isteklerini karşılayan sınıf
})
export class QuestionModule {}//    Soru ile ilgili işlemleri yapacak modül sınıfı