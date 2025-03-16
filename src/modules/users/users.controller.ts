import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }
}
