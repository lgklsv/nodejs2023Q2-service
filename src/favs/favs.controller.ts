import {
  Controller,
  Get,
  Post,
  Param,
  BadRequestException,
  UnprocessableEntityException,
  Delete,
  HttpCode,
  NotFoundException,
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

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }

    const track = this.favsService.removeTrack(id);

    if (!track) {
      throw new NotFoundException('Track with this ID does not exist in favs');
    }

    return;
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

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }

    const album = this.favsService.removeAlbum(id);

    if (!album) {
      throw new NotFoundException('Album with this ID does not exist in favs');
    }

    return;
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

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }

    const artist = this.favsService.removeArtist(id);

    if (!artist) {
      throw new NotFoundException('Artist with this ID does not exist in favs');
    }

    return;
  }
}
