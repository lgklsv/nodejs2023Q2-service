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
  HttpCode,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User with this ID does not exist');
    }
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    try {
      return this.userService.remove(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
