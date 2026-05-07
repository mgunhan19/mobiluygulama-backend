// src/user/questions/question.controller.ts

import { Controller, Get, Query } from '@nestjs/common'; // Query eklendi
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get() // GET http://IP:3000/questions?level=1
  async getQuestionsByLevel(@Query('level') level: number) {
    return await this.questionService.findByLevel(level || 1);
  }
}