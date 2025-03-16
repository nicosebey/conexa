import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRole } from './enums/user-role.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role } = createUserDto
    if (!Object.values(UserRole).includes(role)) {
      throw new BadRequestException(`Invalid role: ${role}`)
    }

    const newUser = this.userRepository.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    })
    return this.userRepository.save(newUser)
  }

  /**
   * Finds a user by their email.
   * @param email - The user's email.
   * @returns The user if found, otherwise null.
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException(`User ${email} not found`)
    }
    return user
  }
}
