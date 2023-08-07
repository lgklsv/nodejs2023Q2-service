import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// @Injectable()
// export class DatabaseService {
//   private users: IUser[] = [];
//   private tracks: ITrack[] = [];
//   private artists: IArtist[] = [];
//   private albums: IAlbum[] = [];
//   private favs: IFavorites = {
//     artists: [],
//     albums: [],
//     tracks: [],
//   };

//   // Users
//   findAllUsers() {
//     const usersCopy = JSON.parse(JSON.stringify(this.users));
//     usersCopy.forEach((user: IUser) => delete user.password);
//     return usersCopy;
//   }

//   findUserById(
//     id: string,
//     options: {
//       password: boolean;
//     },
//   ) {
//     const user = this.users.find((user) => user.id === id);
//     if (!user) return user;

//     if (options.password) return user;

//     const userCopy = JSON.parse(JSON.stringify(user));
//     delete userCopy.password;
//     return userCopy;
//   }

//   createUser(user: IUser) {
//     const newUser = JSON.parse(JSON.stringify(user));
//     this.users.push(newUser);
//   }

//   updateUserPassword(id: string, hash: string) {
//     const userIdx = this.users.findIndex((user) => user.id === id);
//     const user = this.users[userIdx];
//     this.users[userIdx] = {
//       ...user,
//       password: hash,
//       updatedAt: Date.now(),
//       version: user.version + 1,
//     };

//     const userCopy = JSON.parse(JSON.stringify(this.users[userIdx]));
//     delete userCopy.password;
//     return userCopy;
//   }

//   deleteUser(id: string) {
//     const userIdx = this.users.findIndex((user) => user.id === id);
//     if (userIdx === -1) throw new Error('User with this ID does not exist');

//     this.users.splice(userIdx, 1);
//   }

//   // Tracks
//   findAllTracks() {
//     return this.tracks;
//   }

//   findTrackById(id: string) {
//     return this.tracks.find((track) => track.id === id);
//   }

//   createTrack(track: ITrack) {
//     this.tracks.push(track);
//   }

//   updateTrack(id: string, track: ITrack) {
//     const trackIdx = this.tracks.findIndex((track) => track.id === id);
//     this.tracks[trackIdx] = track;
//     return track;
//   }

//   deleteTrack(id: string) {
//     const trackIdx = this.tracks.findIndex((track) => track.id === id);
//     if (trackIdx === -1) throw new Error('Track with this ID does not exist');

//     this.favs.tracks = this.favs.tracks.filter((track) => track.id !== id);

//     this.tracks.splice(trackIdx, 1);
//   }

//   // Artists
//   findAllArtists() {
//     return this.artists;
//   }

//   findArtistById(id: string) {
//     return this.artists.find((artist) => artist.id === id);
//   }

//   createArtist(artist: IArtist) {
//     this.artists.push(artist);
//   }

//   updateArtist(id: string, artist: IArtist) {
//     const artistIdx = this.artists.findIndex((artist) => artist.id === id);
//     this.artists[artistIdx] = artist;
//     return artist;
//   }

//   deleteArtist(id: string) {
//     const artistIdx = this.artists.findIndex((artist) => artist.id === id);
//     if (artistIdx === -1) throw new Error('Artist with this ID does not exist');

//     this.tracks.forEach((track) => {
//       if (track.artistId === id) track.artistId = null;
//     });

//     this.albums.forEach((album) => {
//       if (album.artistId === id) album.artistId = null;
//     });

//     this.favs.artists = this.favs.artists.filter((artist) => artist.id !== id);

//     this.artists.splice(artistIdx, 1);
//   }

//   // Albums
//   findAllAlbums() {
//     return this.albums;
//   }

//   findAlbumById(id: string) {
//     return this.albums.find((albums) => albums.id === id);
//   }

//   createAlbum(album: IAlbum) {
//     this.albums.push(album);
//   }

//   updateAlbum(id: string, album: IAlbum) {
//     const albumIdx = this.albums.findIndex((album) => album.id === id);
//     this.albums[albumIdx] = album;
//     return album;
//   }

//   deleteAlbum(id: string) {
//     const albumIdx = this.albums.findIndex((album) => album.id === id);
//     if (albumIdx === -1) throw new Error('Album with this ID does not exist');

//     this.tracks.forEach((track) => {
//       if (track.albumId === id) track.albumId = null;
//     });

//     this.favs.albums = this.favs.albums.filter((album) => album.id !== id);

//     this.albums.splice(albumIdx, 1);
//   }

//   // Favs
//   findAllFavs() {
//     return this.favs;
//   }

//   addTrackToFavs(track: ITrack) {
//     return this.favs.tracks.push(track);
//   }

//   deleteTrackFromFavs(id: string) {
//     const trackIdx = this.favs.tracks.findIndex((track) => track.id === id);
//     if (trackIdx === -1) return undefined;
//     const track = this.favs.tracks[trackIdx];

//     this.favs.tracks.splice(trackIdx, 1);
//     return track;
//   }

//   addAlbumToFavs(album: IAlbum) {
//     return this.favs.albums.push(album);
//   }

//   deleteAlbumFromFavs(id: string) {
//     const albumIdx = this.favs.albums.findIndex((album) => album.id === id);
//     if (albumIdx === -1) return undefined;
//     const album = this.favs.albums[albumIdx];

//     this.favs.albums.splice(albumIdx, 1);
//     return album;
//   }

//   addArtistToFavs(artist: IArtist) {
//     return this.favs.artists.push(artist);
//   }

//   deleteArtistFromFavs(id: string) {
//     const artistIdx = this.favs.artists.findIndex((artist) => artist.id === id);
//     if (artistIdx === -1) return undefined;
//     const artist = this.favs.artists[artistIdx];

//     this.favs.artists.splice(artistIdx, 1);
//     return artist;
//   }
// }
