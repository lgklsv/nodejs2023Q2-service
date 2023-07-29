import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';

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

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.findTrackById(id);
    if (!track) return track;

    const updatedTrack: ITrack = {
      ...track,
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId ? updateTrackDto.artistId : null,
      albumId: updateTrackDto.albumId ? updateTrackDto.albumId : null,
      duration: updateTrackDto.duration,
    };

    return this.db.updateTrack(id, updatedTrack);
  }

  remove(id: string) {
    return this.db.deleteTrack(id);
  }
}
