import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private db: DatabaseService) {}

  findAll() {
    return this.db.findAllFavs();
  }

  // create(id: string) {
  //   return 'This action adds a new fav';
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} fav`;
  // }
}
