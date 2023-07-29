import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private db: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const track: ITrack = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
      albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
      duration: createTrackDto.duration,
    };
    this.db.createTrack(track);
    return track;
  }

  findAll() {
    return this.db.findAllTracks();
  }

  findOne(id: string) {
    return this.db.findTrackById(id);
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
