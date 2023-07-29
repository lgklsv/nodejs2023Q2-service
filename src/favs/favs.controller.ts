import {
  Controller,
  Get,
  Post,
  Param,
  BadRequestException,
  UnprocessableEntityException,
  // Delete,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  createTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }

    const track = this.favsService.createTrack(id);

    if (!track) {
      throw new UnprocessableEntityException(
        'Track with this ID does not exist',
      );
    }

    return track;
  }

  @Post('album/:id')
  createAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }

    const album = this.favsService.createAlbum(id);

    if (!album) {
      throw new UnprocessableEntityException(
        'Album with this ID does not exist',
      );
    }

    return album;
  }

  @Post('artist/:id')
  createArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }

    const artist = this.favsService.createArtist(id);

    if (!artist) {
      throw new UnprocessableEntityException(
        'Artist with this ID does not exist',
      );
    }

    return artist;
  }

  // @Delete('track/:id')
  // remove(@Param('id') id: string) {
  //   return this.favsService.remove(id);
  // }
}
