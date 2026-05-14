import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()// Kullanıcı ile ilgili işlemleri yapacak servis sınıfı
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,// Repository'yi constructor üzerinden enjekte ediyoruz
  ) {}

  //  Kullanıcıyı veri tabanına yazar
  async register(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create({
      ...userData,
      level: userData.level ?? 1,
    });
    return await this.userRepository.save(newUser);
  }

  //  Kullanıcıyı bulur ve şifreyi kontrol eder
  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı');
  }

  async updateScore(userId: number, newScore: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      // Sadece daha yüksek bir skor yaparsa güncelle (High Score)
      if (newScore > user.highScore) {
        user.highScore = newScore;
        return await this.userRepository.save(user);
      }
    }
    return user;
  }

  async updateLevel(userId: number, level: number) {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) {
      return null;
    }

    const newLevel = Number(level);
    if (Number.isNaN(newLevel) || newLevel < 1) {
      return user;
    }

    // Sadece kaydedilmiş seviyeden yüksekse güncelle
    if (newLevel > user.level) {
      await this.userRepository.update(user.id, { level: newLevel });
      return await this.findById(user.id);
    }

    return user;
  }

  async findById(userId: number) {
    return await this.userRepository.findOne({ where: { id: Number(userId) } });
  }

  // Liderlik tablosu için skorları büyükten küçüğe sıralayıp getiren fonksiyon
  async getLeaderboard() {
    return await this.userRepository.find({
      select: ['username', 'highScore'], 
      order: {
        highScore: 'DESC', 
      },
      take: 10, 
    });
  }
}