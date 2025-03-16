import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { BadRequestException } from '@nestjs/common'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { User } from '../../users/entities/user.entity'
import { UserRole } from '../../users/enums/user-role.enum'
import { UsersService } from '../../users/users.service'

describe('UsersService', () => {
  let service: UsersService
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a user successfully', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      role: UserRole.REGULAR,
    }

    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword' as never)
    jest.spyOn(userRepository, 'create').mockReturnValue(createUserDto as User)
    jest.spyOn(userRepository, 'save').mockResolvedValue(createUserDto as User)

    const result = await service.create(createUserDto)
    expect(result).toEqual(createUserDto)
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    expect(userRepository.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedPassword',
      role: UserRole.REGULAR,
    })
    expect(userRepository.save).toHaveBeenCalled()
  })

  it('should throw BadRequestException for invalid role', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'password123',
      role: 'INVALID_ROLE' as UserRole,
    }

    await expect(service.create(createUserDto)).rejects.toThrow(BadRequestException)
  })
})
