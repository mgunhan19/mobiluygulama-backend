import { Controller, Post, Body, Get, Query, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth') // Burası 'auth' olmalı çünkü kullanıcıyla ilgili işlemler burada gerçekleşecek
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register') // Burası 'register' olmalı
  register(@Body() body: any) {
    return this.userService.register(body);// Kullanıcı kaydı için gerekli bilgileri body üzerinden alıyoruz
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.userService.login(body.username, body.password);
  }

  @Post('update-score')
  async updateScore(@Body() body: { userId: number, score: number }) {
    return this.userService.updateScore(body.userId, body.score);
  }

  @Post('update-level')
  async updateLevel(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('level', ParseIntPipe) level: number,
  ) {
    return this.userService.updateLevel(userId, level);
  }

  @Patch('level/:userId')
  async patchLevel(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('level', ParseIntPipe) level: number,
  ) {
    return this.userService.updateLevel(userId, level);
  }

  @Get('profile')
  async getProfile(@Query('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) {
      return null;
    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  // Liderlik tablosu verilerini döndüren GET endpoint'i
  @Get('leaderboard')
  async getLeaderboard() {
    return this.userService.getLeaderboard();
  }
}