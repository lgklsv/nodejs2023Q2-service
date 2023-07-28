import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private users: IUser[] = [];

  findAllUsers() {
    const usersCopy = JSON.parse(JSON.stringify(this.users));
    usersCopy.forEach((user: IUser) => delete user.password);
    return usersCopy;
  }

  findUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) return user;

    const userCopy = JSON.parse(JSON.stringify(user));
    delete userCopy.password;
    return userCopy;
  }

  createUser(user: IUser) {
    const newUser = JSON.parse(JSON.stringify(user));
    this.users.push(newUser);
  }
}
