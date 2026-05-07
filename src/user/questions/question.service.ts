// src/user/questions/question.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findByLevel(level: number): Promise<Question[]> {
    return await this.questionRepository.find({
      where: { level: Number(level) }
    });
  }
}