import { Test, TestingModule } from '@nestjs/testing'
import { HttpService } from '@nestjs/axios'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { of } from 'rxjs'
import { Film } from '../entities/film.entity'
import { FilmsService } from '../films.service'
import { AxiosHeaders, AxiosResponse } from 'axios'

describe('FilmsService', () => {
  let service: FilmsService
  let httpService: HttpService
  let filmRepository: Repository<Film>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(of({ data: { results: [] } })),
          },
        },
        {
          provide: getRepositoryToken(Film),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<FilmsService>(FilmsService)
    httpService = module.get<HttpService>(HttpService)
    filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should fetch and return films from API', async () => {
    jest.spyOn(httpService, 'get').mockReturnValueOnce(
      of({
        data: { results: [{ id: 1, title: 'Test Film' }] },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: {},
      } as AxiosResponse)
    )
    const films = await service['fetchAll']<Film>('test-url')
    expect(films).toEqual([{ id: 1, title: 'Test Film' }])
  })
})
