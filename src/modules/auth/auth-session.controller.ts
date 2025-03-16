import { Controller, Post, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth-session.service'
import { LoginDto } from './dto/login.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión', description: 'Genera un token JWT con credenciales válidas.' })
  @ApiResponse({
    status: 201,
    description: 'Token JWT generado correctamente.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsIn...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiOperation({ summary: 'Autenticación de usuario' })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password)
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas')
    }
    return this.authService.login(user)
  }
}
