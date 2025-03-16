import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { User } from './modules/users/entities/user.entity'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth-session.module'
import { AuthController } from './modules/auth/auth-session.controller'
import { Film } from './modules/films/entities/film.entity'
import { FilmsModule } from './modules/films/films.module'
import { JwtStrategy } from './modules/auth/jwt.strategy'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: true,
      synchronize: true,
      entities: [User, Film],
      // dropSchema: true,
    }),
    UsersModule,
    FilmsModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
