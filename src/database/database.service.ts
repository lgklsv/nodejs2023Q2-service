import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private users: IUser[] = [];
  private tracks: ITrack[] = [];
  private artists: IArtist[] = [];
  private albums: IAlbum[] = [];

  // Users
  findAllUsers() {
    const usersCopy = JSON.parse(JSON.stringify(this.users));
    usersCopy.forEach((user: IUser) => delete user.password);
    return usersCopy;
  }

  findUserById(
    id: string,
    options: {
      password: boolean;
    },
  ) {
    const user = this.users.find((user) => user.id === id);
    if (!user) return user;

    if (options.password) return user;

    const userCopy = JSON.parse(JSON.stringify(user));
    delete userCopy.password;
    return userCopy;
  }

  createUser(user: IUser) {
    const newUser = JSON.parse(JSON.stringify(user));
    this.users.push(newUser);
  }

  updateUserPassword(id: string, hash: string) {
    const userIdx = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIdx];
    this.users[userIdx] = {
      ...user,
      password: hash,
      updatedAt: Date.now(),
      version: user.version + 1,
    };

    const userCopy = JSON.parse(JSON.stringify(this.users[userIdx]));
    delete userCopy.password;
    return userCopy;
  }

  deleteUser(id: string) {
    const userIdx = this.users.findIndex((user) => user.id === id);
    if (userIdx === -1) throw new Error('User with this ID does not exist');

    this.users.splice(userIdx, 1);
  }

  // Tracks
  findAllTracks() {
    return this.tracks;
  }

  findTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(track: ITrack) {
    this.tracks.push(track);
  }

  updateTrack(id: string, track: ITrack) {
    const trackIdx = this.tracks.findIndex((track) => track.id === id);
    this.tracks[trackIdx] = track;
    return track;
  }

  deleteTrack(id: string) {
    const trackIdx = this.tracks.findIndex((track) => track.id === id);
    if (trackIdx === -1) throw new Error('Track with this ID does not exist');

    this.tracks.splice(trackIdx, 1);
  }

  // Artists
  findAllArtists() {
    return this.artists;
  }

  findArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(artist: IArtist) {
    this.artists.push(artist);
  }

  updateArtist(id: string, artist: IArtist) {
    const artistIdx = this.artists.findIndex((artist) => artist.id === id);
    this.artists[artistIdx] = artist;
    return artist;
  }

  deleteArtist(id: string) {
    const artistIdx = this.artists.findIndex((artist) => artist.id === id);
    if (artistIdx === -1) throw new Error('Artist with this ID does not exist');

    this.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
    this.artists.splice(artistIdx, 1);
  }
}
