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

    const user: IUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: hash,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.createUser(user);

    delete user.password;
    return user;
  }

  findAll() {
    return this.db.findAllUsers();
  }

  findOne(id: string) {
    return this.db.findUserById(id, {
      password: false,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.db.findUserById(id, {
      password: true,
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

    return this.db.updateUserPassword(id, hash);
  }

  remove(id: string) {
    return this.db.deleteUser(id);
  }
}
