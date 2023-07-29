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

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.findArtistById(id);
    if (!artist) return artist;

    const updatedArtist: IArtist = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };

    return this.db.updateArtist(id, updatedArtist);
  }

  remove(id: string) {
    return this.db.deleteArtist(id);
  }
}
