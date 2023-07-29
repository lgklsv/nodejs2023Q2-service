import {
  Controller,
  Get,
  // Post,
  // Body,
  // Param,
  // Delete,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  // @Post('track/:id')
  // create(@Param('id') id: string) {
  //   return this.favsService.create(id);
  // }

  // @Delete('track/:id')
  // remove(@Param('id') id: string) {
  //   return this.favsService.remove(id);
  // }
}
