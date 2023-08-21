import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/user/dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/user/entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService, private jwtService: JwtService) {}

  async signup(userDto: CreateUserDto) {
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
    await this.updateRtHash(user.id, tokens.refreshToken);
    return plainToInstance(User, user);
  }

  async login(userDto: CreateUserDto): Promise<Tokens> {
    const user = await this.db.user.findFirst({
      where: {
        login: userDto.login,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied!');

    const passwordMatches = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!passwordMatches) throw new ForbiddenException('Access Denied!');

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async refresh(rt: string) {
    if (!rt) {
      throw new UnauthorizedException('No refresh token provided in body');
    }

    const isTokenValid = await this.verifyRt(rt);

    if (!isTokenValid)
      throw new ForbiddenException('Refresh token is invalid or expired');

    const { sub } = this.jwtService.decode(rt);

    const user = await this.db.user.findUnique({
      where: {
        id: sub,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied!');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied!');

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
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

  // Utility functions
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
      accessToken: at,
      refreshToken: rt,
    };
  }

  async verifyRt(rt: string): Promise<boolean> {
    try {
      const isValid = await this.jwtService.verifyAsync(rt, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return isValid;
    } catch (error) {
      return false;
    }
  }
}
