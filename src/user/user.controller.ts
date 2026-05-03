import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth') // Burası 'auth' olmalı
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register') // Burası 'register' olmalı
  register(@Body() body: any) {
    return this.userService.register(body);
  }
  @Post('login')
async login(@Body() body: any) {
  return this.userService.login(body.username, body.password);
}
@Post('update-score')
async updateScore(@Body() body: { userId: number, score: number }) {
  return this.userService.updateScore(body.userId, body.score);
}
}