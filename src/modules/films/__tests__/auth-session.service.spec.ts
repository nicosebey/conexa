import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { AuthService } from '../../auth/auth-session.service'
import { LoginDto } from '../../auth/dto/login.dto'
import { UsersService } from '../../users/users.service'

describe('AuthService', () => {
  let service: AuthService
  let usersService: UsersService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedPassword' }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should validate user with correct credentials', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)
    const result = await service.validateUser('test@example.com', 'password123')
    expect(result).toEqual({ id: 1, email: 'test@example.com' })
  })

  it('should return null for invalid credentials', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)
    const result = await service.validateUser('test@example.com', 'wrongpassword')
    expect(result).toBeNull()
  })

  it('should return a JWT token on successful login', async () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'password123' }
    jest.spyOn(service, 'validateUser').mockResolvedValueOnce({ id: 1, email: loginDto.email })
    const result = await service.login(loginDto)
    expect(result).toEqual({ access_token: 'mocked-jwt-token' })
  })
})
