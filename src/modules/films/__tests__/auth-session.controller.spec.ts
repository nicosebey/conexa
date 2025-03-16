import { Test, TestingModule } from '@nestjs/testing'
import { UnauthorizedException } from '@nestjs/common'
import { AuthController } from '../../auth/auth-session.controller'
import { AuthService } from '../../auth/auth-session.service'
import { LoginDto } from '../../auth/dto/login.dto'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue({ password: 'password123', email: 'test@example.com' }),
            login: jest.fn().mockResolvedValue({ access_token: 'mocked-jwt-token' }),
          },
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return a JWT token on successful login', async () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'password123' }
    const result = await controller.login(loginDto)
    expect(result).toEqual({ access_token: 'mocked-jwt-token' })
    expect(service.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.password)
    expect(service.login).toHaveBeenCalledWith(loginDto)
  })

  it('should throw UnauthorizedException for invalid credentials', async () => {
    jest.spyOn(service, 'validateUser').mockResolvedValue(null)
    const loginDto: LoginDto = { email: 'test@example.com', password: 'wrongpassword' }
    await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException)
  })
})
