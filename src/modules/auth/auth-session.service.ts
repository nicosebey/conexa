import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  /**
   * User login.
   * @param loginDto - Data Transfer Object containing login details.
   * @returns An object containing the user, session token, and refresh token.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async login(userLogin: LoginDto): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findByEmail(userLogin.email)
      if (!user) {
        throw new UnauthorizedException('Invalid credentials')
      }
      const payload = { email: user.email, role: user.role }
      return {
        access_token: this.jwtService.sign(payload),
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
