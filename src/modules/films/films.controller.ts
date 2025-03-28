import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { FilmsService } from './films.service'
import { Film } from './entities/film.entity'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { UpdateFilmDto } from './dto/update-film.dto'
import { CreateFilmDto } from './dto/create-film.dto'
import { log } from 'node:console'
import { AuthGuard } from '@nestjs/passport'

import { Roles } from '../../guards/roles.decorator'
import { RolesGuard } from '../../guards/roles.guard'

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post('sync')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles('Administrador', 'Administrador')
  @ApiOperation({ summary: 'Sync films from api with our Database' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all the films',
    schema: {
      example: {
        data: 'Films correctly sync',
      },
    },
  })
  async sync(): Promise<{ message: string }> {
    await this.filmsService.sync()
    return { message: 'Films correctly sync' }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles('Administrador', 'Administrador')
  @ApiOperation({ summary: 'Create a film' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a film',
    schema: {
      example: {
        data: {
          id: '1',
          episode_id: 2,
          title: 'title',
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          characters: '[character1, character2]',
          starships: '[character1, character2]',
          vehicles: '[character1, character2]',
          species: '[character1, character2]',
          planets: '[character1, character2]',
        },
      },
    },
  })
  async create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    try {
      return this.filmsService.create(createFilmDto)
    } catch (error) {
      log(error)
      throw new Error('Error creating film')
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all the films ' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all the films',
    schema: {
      example: {
        data: [
          {
            id: '1',
            episode_id: 1,
            title: 'title',
            director: 'George Lucas',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1977-05-25',
            characters: '[character1, character2]',
            starships: '[character1, character2]',
            vehicles: '[character1, character2]',
            species: '[character1, character2]',
            planets: '[character1, character2]',
          },
          {
            id: '2',
            episode_id: 2,
            title: 'title2',
            director: 'George Lucas',
            producer: 'Gary Kurtz, Rick McCallum',
            release_date: '1978-05-25',
            characters: '[character1, character2]',
            starships: '[character1, character2]',
            vehicles: '[character1, character2]',
            species: '[character1, character2]',
            planets: '[character1, character2]',
          },
        ],
      },
    },
  })
  async getAll(): Promise<Film[]> {
    return this.filmsService.getAll()
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Regular', 'Regular')
  @ApiOperation({ summary: 'Get a film by ID' })
  @ApiParam({ name: '1', description: 'Film id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a film by ID',
    schema: {
      example: {
        data: {
          id: '1',
          episode_id: 1,
          title: 'title',
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          characters: '[character1, character2]',
          starships: '[character1, character2]',
          vehicles: '[character1, character2]',
          species: '[character1, character2]',
          planets: '[character1, character2]',
        },
      },
    },
  })
  async getById(id: string): Promise<Film> {
    return this.filmsService.getById(id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Administrador', 'Administrador')
  @ApiParam({ name: 'id', description: 'Film id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a film by ID',
    schema: {
      example: {
        data: {
          id: '1',
          episode_id: 1,
          title: 'title',
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          characters: '[character1, character2]',
          starships: '[character1, character2]',
          vehicles: '[character1, character2]',
          species: '[character1, character2]',
          planets: '[character1, character2]',
        },
      },
    },
  })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateFilmDto: UpdateFilmDto): Promise<Film> {
    return this.filmsService.update(id, updateFilmDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Administrador', 'Administrador')
  @ApiParam({ name: 'id', description: 'Film id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete a film by ID',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.filmsService.delete(id)
  }
}
