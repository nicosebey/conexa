import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { UpdateFilmDto } from '../dto/update-film.dto'
import { FilmsController } from '../films.controller'
import { FilmsService } from '../films.service'

describe('FilmsController', () => {
  let controller: FilmsController
  let service: FilmsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            sync: jest.fn().mockResolvedValue('Films correctly synced'),
            getAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Film' }]),
            getById: jest.fn().mockResolvedValue({ id: 1, title: 'Test Film' }),
            create: jest.fn().mockResolvedValue({ id: 1, title: 'New Film' }),
            update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Film' }),
            delete: jest.fn().mockResolvedValue({ data: 'Film deleted' }),
          },
        },
      ],
    }).compile()

    controller = module.get<FilmsController>(FilmsController)
    service = module.get<FilmsService>(FilmsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call sync method and return correct response', async () => {
    const result = await controller.sync()
    expect(result).toEqual({ message: 'Films correctly sync' })
    expect(service.sync).toHaveBeenCalled()
  })

  it('should return all films', async () => {
    const result = await controller.getAll()
    expect(result).toEqual([{ id: 1, title: 'Test Film' }])
    expect(service.getAll).toHaveBeenCalled()
  })

  it('should return one film by id', async () => {
    const result = await controller.getById('1')
    expect(result).toEqual({ id: 1, title: 'Test Film' })
    expect(service.getById).toHaveBeenCalledWith('1')
  })

  it('should throw NotFoundException if film does not exist', async () => {
    jest.spyOn(service, 'getById').mockRejectedValue(new NotFoundException('Film not found'))
    await expect(controller.getById('999')).rejects.toThrow(NotFoundException)
  })

  it('should update a film', async () => {
    const dto: UpdateFilmDto = { title: 'Updated Film' }
    const result = await controller.update('1', dto)
    expect(result).toEqual({ id: 1, title: 'Updated Film' })
    expect(service.update).toHaveBeenCalledWith('1', dto)
  })

  it('should throw NotFoundException if updating non-existing film', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Film not found'))
    await expect(controller.update('999', { title: 'Non-existing' })).rejects.toThrow(NotFoundException)
  })

  it('should throw NotFoundException if updating a deleted film', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Film has been deleted'))
    await expect(controller.update('2', { title: 'Deleted Film' })).rejects.toThrow(NotFoundException)
  })

  it('should throw BadRequestException if dto is incomplete or incorrect', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new BadRequestException('Invalid data'))
    await expect(controller.update('1', {} as UpdateFilmDto)).rejects.toThrow(BadRequestException)
  })

  it('should delete a film', async () => {
    const result = await controller.delete('1')
    expect(result).toEqual({ data: 'Film deleted' })
    expect(service.delete).toHaveBeenCalledWith('1')
  })

  it('should throw NotFoundException if deleting non-existing film', async () => {
    jest.spyOn(service, 'delete').mockRejectedValue(new NotFoundException('Film not found'))
    await expect(controller.delete('999')).rejects.toThrow(NotFoundException)
  })
})
