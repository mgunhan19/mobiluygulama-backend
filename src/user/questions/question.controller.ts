import { Controller, Get } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get() // GET http://IP_ADRESIN:3000/questions
  async getAllQuestions() {
    return await this.questionService.findAll();
  }
}