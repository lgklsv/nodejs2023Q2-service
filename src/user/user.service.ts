import { v4 as uuidv4 } from 'uuid';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto';

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

    console.log(user);
    return user;

    // delete user.password;
  }

  async findAll() {
    return await this.db.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });

    console.log(user);
    return user;
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

    return this.db.user.update({
      where: {
        id,
      },
      data: {
        password: hash,
      },
    });
  }

  remove(id: string) {
    return this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
