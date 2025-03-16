import { Injectable, NotFoundException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Film } from './entities/film.entity'
import { UpdateFilmDto } from './dto/update-film.dto'
import { CreateFilmDto } from './dto/create-film.dto'

@Injectable()
export class FilmsService {
  private readonly starWarsURL = process.env.STARWARS_API
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>
  ) {}

  private async fetchAll<Film>(url: string): Promise<Film[]> {
    const response = await firstValueFrom(this.httpService.get<{ results: Film[] }>(url))
    const { data } = response
    return data.results
  }

  /**
   * synchronize films from the Star Wars API with local database
   * @returns
   */
  async sync(): Promise<void> {
    const movies: Film[] = await this.fetchAll<Film>(`${process.env.STARWARS_API}/films`)
    for (const movie of movies) {
      let film = await this.filmRepository.findOne({ where: { episode_id: movie.episode_id } })
      if (!film) {
        film = this.filmRepository.create({
          episode_id: movie.episode_id,
          title: movie.title,
          director: movie.director,
          release_date: movie.release_date,
          opening_crawl: movie.opening_crawl,
          producer: movie.producer,
          characters: movie.characters,
          planets: movie.planets,
          starships: movie.starships,
          vehicles: movie.vehicles,
          species: movie.species,
        })
        await this.filmRepository.save(film)
      }
    }
  }

  /**
   * Create a film
   * @param createFilmDto
   * @returns
   */
  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const film = this.filmRepository.create(createFilmDto)
    return this.filmRepository.save(film)
  }

  /**
   * Get  list of films
   * @returns
   */
  async getAll(): Promise<Film[]> {
    return this.filmRepository.find()
  }

  /**
   * Get a film by ID
   * @param id film ID
   * @returns
   */
  async getById(id: string): Promise<Film> {
    const film = await this.filmRepository.findOne({ where: { id } })
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`)
    }
    return film
  }

  /**
   * Update a region
   * @param id  Filmd ID
   * @param updateFilmDto
   * @returns
   */
  async update(id: string, data: UpdateFilmDto): Promise<Film> {
    const film = await this.getById(id)
    if (!film || film.deletedAt) {
      throw new NotFoundException(`Film with ID ${id} not found`)
    }
    try {
      return this.filmRepository.save({ ...film, ...data })
    } catch (error) {
      throw new NotFoundException(`Film with ID ${id} not found`)
    }
  }

  /**
   * Delete a region
   * @param id  Filmd ID
   * @returns
   */
  async delete(id: string): Promise<void> {
    const film = await this.getById(id)
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`)
    }
    await this.filmRepository.softDelete(id)
  }
}
