import { v4 as uuidv4 } from 'uuid';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );

    const user = await this.db.user.create({
      data: {
        id: uuidv4(),
        login: createUserDto.login,
        password: hash,
        version: 1,
      },
    });
    return plainToInstance(User, user);
  }

  async findAll() {
    const users = await this.db.user.findMany();
    return plainToInstance(User, users);
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return user;
    return plainToInstance(User, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return user;

    const oldPasswordValid = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );
    if (!oldPasswordValid) {
      throw new ForbiddenException('Old password is wrong');
    }

    const hash = await bcrypt.hash(
      updateUserDto.newPassword,
      +process.env.CRYPT_SALT,
    );

    const updatedUser = this.db.user.update({
      where: {
        id,
      },
      data: {
        password: hash,
        version: user.version + 1,
      },
    });

    return plainToInstance(User, updatedUser);
  }

  remove(id: string) {
    return this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
