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
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';
import { Prisma } from '@prisma/client';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Body does not contain required fields',
  })
  @ApiBody({
    type: CreateArtistDto,
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [Artist],
  })
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Artist with this id does not exist',
  })
  async findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist with this ID does not exist');
    }
    return artist;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Artist with this id does not exist',
  })
  @ApiBody({
    type: PartialType(CreateArtistDto),
  })
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    try {
      return await this.artistService.update(id, updateArtistDto);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('Artist with this ID does not exist');
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully' })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({
    status: 404,
    description: 'Artist with this id does not exist',
  })
  async remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    try {
      return await this.artistService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
