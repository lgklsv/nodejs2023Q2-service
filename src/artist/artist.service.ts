import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private db: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const artist: IArtist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.db.createArtist(artist);
    return artist;
  }

  findAll() {
    return this.db.findAllArtists();
  }

  findOne(id: string) {
    return this.db.findArtistById(id);
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
