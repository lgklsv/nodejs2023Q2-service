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
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Body does not contain required fields',
  })
  @ApiBody({
    type: CreateTrackDto,
  })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [Track],
  })
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Track,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Track with this id does not exist',
  })
  async findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track with this ID does not exist');
    }
    return track;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Track,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Track with this id does not exist',
  })
  @ApiBody({
    type: PartialType(CreateTrackDto),
  })
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const updatedTrack = await this.trackService.update(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException('Track with this ID does not exist');
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: 204, description: 'Track deleted successfully' })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Track with this id does not exist',
  })
  async remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    try {
      return await this.trackService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
