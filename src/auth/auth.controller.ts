import { Controller, Post, Body, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registration successful',
      result,
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const result = await this.authService.login(loginDto)
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      result,
    }
  }
}
