import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import* as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(userData: Partial<User>): Promise<User> {
  const hashedPassword = await bcrypt.hash(userData.password!, 10);
  const newUser = this.userRepository.create({
    ...userData,
    password: hashedPassword,
    level: userData.level ?? 1,
  });
  return await this.userRepository.save(newUser);
}

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (user) {
      // Şifre bcrypt ile şifrelenmiş mi kontrol et (bcrypt hash'leri $ ile başlar)
      const isEncrypted = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');

      if (isEncrypted) {
        // Yeni sistem (şifrelenmiş) kullanıcılar
        if (await bcrypt.compare(password, user.password)) {
          return user;
        }
      } else {
        // Eski sistem (şifrelenmemiş düz metin) kullanıcılar
        if (password === user.password) {
          // Kullanıcı doğru şifre girdiyse, hesabını yeni güvenli sisteme geçirelim (veritabanını güncelleyelim)
          user.password = await bcrypt.hash(password, 10);
          await this.userRepository.save(user);
          return user;
        }
      }
    }
    
    throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı');
  }

  async updateScore(userId: number, newScore: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
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