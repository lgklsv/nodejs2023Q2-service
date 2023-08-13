import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private db: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.db.album.create({
      data: {
        id: uuidv4(),
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
      },
    });
  }

  async findAll() {
    return await this.db.album.findMany();
  }

  async findOne(id: string) {
    return await this.db.album.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.db.album.update({
      where: {
        id,
      },
      data: {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId ? updateAlbumDto.artistId : null,
      },
    });
  }

  async remove(id: string) {
    return await this.db.album.delete({
      where: {
        id,
      },
    });
  }
}
