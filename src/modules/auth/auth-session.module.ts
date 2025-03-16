import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth-session.service'
import { UsersModule } from '../users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'
import { FilmsModule } from '../films/films.module'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    PassportModule,
    FilmsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default_secret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
