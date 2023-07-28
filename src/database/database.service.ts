import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private users: IUser[] = [
    // {
    //   id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    //   login: 'string',
    //   password: 'string',
    //   version: 324324,
    //   createdAt: 2342323,
    //   updatedAt: 324234234,
    // },
  ];

  findAllUsers() {
    return this.users;
  }

  findUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
