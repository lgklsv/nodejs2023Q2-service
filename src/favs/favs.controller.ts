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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favorites } from './entities/favorites.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Favorites,
  })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: Track,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 422,
    description: 'Track with this id does not exist',
  })
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
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({ status: 204, description: 'Track deleted successfully' })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Track with this id does not exist in favorites',
  })
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
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: Album,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 422,
    description: 'Album with this id does not exist',
  })
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
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully' })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Album with this id does not exist in favorites',
  })
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
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 422,
    description: 'Artist with this id does not exist',
  })
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
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully' })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Artist with this id does not exist in favorites',
  })
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
