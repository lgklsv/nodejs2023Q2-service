import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private db: DatabaseService) {}

  async findAll() {
    return await this.db.favorites.findMany();
  }

  async createTrack(id: string) {
    const track = await this.db.track.findUnique({ where: { id } });
    if (!track) return track;

    this.db.addTrackToFavs(track);
    return track;
  }

  removeTrack(id: string) {
    return this.db.deleteTrackFromFavs(id);
  }

  createAlbum(id: string) {
    const album = this.db.findAlbumById(id);
    if (!album) return album;

    this.db.addAlbumToFavs(album);
    return album;
  }

  removeAlbum(id: string) {
    return this.db.deleteAlbumFromFavs(id);
  }

  createArtist(id: string) {
    const artist = this.db.findArtistById(id);
    if (!artist) return artist;

    this.db.addArtistToFavs(artist);
    return artist;
  }

  removeArtist(id: string) {
    return this.db.deleteArtistFromFavs(id);
  }
}
