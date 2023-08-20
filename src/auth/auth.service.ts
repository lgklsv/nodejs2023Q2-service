import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/user/dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService, private jwtService: JwtService) {}

  async hashData(data: string) {
    return bcrypt.hash(data, +process.env.CRYPT_SALT);
  }

  async getTokens(userId: string, login: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, login },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, login },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async signup(userDto: CreateUserDto): Promise<Tokens> {
    const hash = await this.hashData(userDto.password);

    const user = await this.db.user.create({
      data: {
        id: uuidv4(),
        login: userDto.login,
        password: hash,
        version: 1,
      },
    });

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async login(userDto: CreateUserDto) {
    console.log('login');
  }

  async refresh(token: string) {
    console.log('refresh');
  }
}
