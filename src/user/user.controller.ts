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
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create(register) user' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: OmitType(User, ['password'] as const),
  })
  @ApiResponse({
    status: 400,
    description: 'Body does not contain required fields',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [OmitType(User, ['password'] as const)],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: OmitType(User, ['password'] as const),
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({ status: 404, description: 'User with this id does not exist' })
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

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: OmitType(User, ['password'] as const),
  })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({ status: 403, description: 'Old password does not match' })
  @ApiResponse({ status: 404, description: 'User with this id does not exist' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('ID should be valid UUID');
    }
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User with this ID does not exist');
    }
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 400, description: 'Id is not valid' })
  @ApiResponse({ status: 404, description: 'User with this id does not exist' })
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
