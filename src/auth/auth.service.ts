import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';

import { CreateUserDto } from 'src/user/dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService) {}

  async signup(userDto: CreateUserDto) {
    const hash = await bcrypt.hash(userDto.password, +process.env.CRYPT_SALT);

    const user = await this.db.user.create({
      data: {
        id: uuidv4(),
        login: userDto.login,
        password: hash,
        version: 1,
      },
    });
    return plainToInstance(User, user);
  }

  async login(userDto: CreateUserDto) {
    console.log('login');
  }

  async refresh(token: string) {
    console.log('refresh');
  }
}
