import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() userDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signup(userDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userDto: CreateUserDto): Promise<Tokens> {
    return this.authService.login(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@Req() req: Request) {
    const user = req.user;
    return this.authService.refresh(user['sub'], user['refreshToken']);
  }
}
