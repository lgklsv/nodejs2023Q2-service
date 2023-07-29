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

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.findAlbumById(id);
    if (!album) return album;

    const updatedAlbum: IAlbum = {
      ...album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId ? updateAlbumDto.artistId : null,
    };

    return this.db.updateAlbum(id, updatedAlbum);
  }

  remove(id: string) {
    return this.db.deleteAlbum(id);
  }
}
