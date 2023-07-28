import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);

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
    return this.db.findUserById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.db.deleteUser(id);
  }
}
