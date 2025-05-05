import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.register(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registration successful',
      result,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const result = await this.userService.login(loginDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      result,
    };
  }
}
