import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track with this ID does not exist');
    }
    return track;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const updatedTrack = this.trackService.update(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException('Track with this ID does not exist');
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    try {
      return this.trackService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}