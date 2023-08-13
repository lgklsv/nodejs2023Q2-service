import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private db: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.db.artist.create({
      data: {
        id: uuidv4(),
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      },
    });
  }

  async findAll() {
    return await this.db.artist.findMany();
  }

  async findOne(id: string) {
    return this.db.artist.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.db.artist.update({
      where: {
        id,
      },
      data: {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      },
    });
  }

  async remove(id: string) {
    return await this.db.artist.delete({
      where: {
        id,
      },
    });
  }
}
