import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist with this ID does not exist');
    }
    return artist;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(+id);
  }
}
