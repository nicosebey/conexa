import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FilmsService } from './films.service'
import { FilmsController } from './films.controller'
import { Film } from './entities/film.entity'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [TypeOrmModule.forFeature([Film]), HttpModule],
  providers: [FilmsService],
  controllers: [FilmsController],
  exports: [FilmsService],
})
export class FilmsModule {}
