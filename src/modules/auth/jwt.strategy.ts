import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    console.log('JWT_SECRETtttttttttttttttttttttttttttttttttttttttt:', configService.get<string>('JWT_SECRET'))
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
    })
  }

  async validate(payload: any) {
    console.log('PAYLOAdddddddddddD:', payload)
    return { email: payload.email, role: payload.role }
  }
}
