import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(private db: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.db.track.create({
      data: {
        id: uuidv4(),
        name: createTrackDto.name,
        artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
        albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
        duration: createTrackDto.duration,
      },
    });
  }

  async findAll() {
    return await this.db.track.findMany();
  }

  async findOne(id: string) {
    return await this.db.track.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.db.track.update({
      where: {
        id,
      },
      data: {
        name: updateTrackDto.name,
        artistId: updateTrackDto.artistId ? updateTrackDto.artistId : null,
        albumId: updateTrackDto.albumId ? updateTrackDto.albumId : null,
        duration: updateTrackDto.duration,
      },
    });
  }

  async remove(id: string) {
    return await this.db.track.delete({
      where: {
        id,
      },
    });
  }
}
