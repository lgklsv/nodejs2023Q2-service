import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private db: DatabaseService) {}

  async findAll() {
    const artists = await this.db.favoriteArtists.findMany({
      include: {
        artist: true,
      },
    });

    const albums = await this.db.favoriteAlbums.findMany({
      include: {
        album: true,
      },
    });

    const tracks = await this.db.favoriteTracks.findMany({
      include: {
        track: true,
      },
    });

    return {
      artists: artists.map((item) => item.artist),
      albums: albums.map((item) => item.album),
      tracks: tracks.map((item) => item.track),
    };
  }

  async createTrack(id: string) {
    const track = await this.db.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) return track;

    await this.db.favoriteTracks.create({
      data: {
        trackId: id,
      },
    });
    return track;
  }

  async removeTrack(id: string) {
    return await this.db.favoriteTracks.delete({
      where: {
        trackId: id,
      },
    });
  }

  async createAlbum(id: string) {
    const album = await this.db.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) return album;

    await this.db.favoriteAlbums.create({
      data: {
        albumId: id,
      },
    });
    return album;
  }

  async removeAlbum(id: string) {
    return await this.db.favoriteAlbums.delete({
      where: {
        albumId: id,
      },
    });
  }

  async createArtist(id: string) {
    const artist = await this.db.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) return artist;

    await this.db.favoriteArtists.create({
      data: {
        artistId: id,
      },
    });
    return artist;
  }

  async removeArtist(id: string) {
    return await this.db.favoriteArtists.delete({
      where: {
        artistId: id,
      },
    });
  }
}
