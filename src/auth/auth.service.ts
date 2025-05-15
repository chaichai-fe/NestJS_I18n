import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import db from '../db'
import { userTable } from '../db/schema'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { eq } from 'drizzle-orm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, createUserDto.email))

    if (existingUser.length > 0) {
      throw new ConflictException('User already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    // Create user
    const [user] = await db
      .insert(userTable)
      .values({
        ...createUserDto,
        password: hashedPassword,
      })
      .returning()

    // Generate JWT token
    const token = this.jwtService.sign(
      { userId: user.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    )

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  }

  async login(loginDto: LoginUserDto) {
    // Find user
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, loginDto.email))

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Generate JWT token
    const token = this.jwtService.sign(
      { userId: user.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    )

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}
