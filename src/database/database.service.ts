import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private users: IUser[] = [];
}
