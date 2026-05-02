import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // KAYIT: Kullanıcıyı veri tabanına yazar
  async register(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  // GİRİŞ: Kullanıcıyı bulur ve şifreyi kontrol eder
  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı');
  }
}