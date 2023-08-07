import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Body does not contain required fields',
  })
  @ApiBody({
    type: CreateAlbumDto,
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [Album],
  })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Album,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Album with this id does not exist',
  })
  async findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album with this ID does not exist');
    }
    return album;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Album,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Album with this id does not exist',
  })
  @ApiBody({
    type: PartialType(CreateAlbumDto),
  })
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const updatedAlbum = await this.albumService.update(id, updateAlbumDto);
    if (!updatedAlbum) {
      throw new NotFoundException('Album with this ID does not exist');
    }
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully' })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Album with this id does not exist',
  })
  async remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    try {
      return await this.albumService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
