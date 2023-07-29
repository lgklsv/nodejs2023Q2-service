import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private db: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album: IAlbum = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
    };
    this.db.createAlbum(album);
    return album;
  }

  findAll() {
    return this.db.findAllAlbums();
  }

  findOne(id: string) {
    return this.db.findAlbumById(id);
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
