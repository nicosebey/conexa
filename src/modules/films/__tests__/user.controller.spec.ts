import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'
import { UsersController } from '../../users/users.controller'
import { CreateUserDto } from '../../users/dto/create-user.dto'
import { UserRole } from '../../users/enums/user-role.enum'
import { UsersService } from '../../users/users.service'

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: 1, name: 'John Doe', email: 'johndoe@example.com', role: UserRole.REGULAR }),
          },
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a user successfully', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      role: UserRole.REGULAR,
    }

    const result = await controller.createUser(createUserDto)
    expect(result).toEqual({ id: 1, name: 'John Doe', email: 'johndoe@example.com', role: UserRole.REGULAR })
    expect(service.create).toHaveBeenCalledWith(createUserDto)
  })

  it('should throw BadRequestException for invalid role', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'password123',
      role: 'INVALID_ROLE' as UserRole,
    }

    jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException('Invalid role'))
    await expect(controller.createUser(createUserDto)).rejects.toThrow(BadRequestException)
  })
})
