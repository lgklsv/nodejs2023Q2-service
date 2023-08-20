import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
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

  @Post('refresh')
  refresh(@Body('token') token: string) {
    return this.authService.refresh(token);
  }
}
