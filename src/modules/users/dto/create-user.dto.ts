import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'
import { User } from '../entities/user.entity'
import { UserRole } from '../enums/user-role.enum'

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  email!: string

  @ApiPropertyOptional({
    description: 'Password for the user',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password!: string

  @ApiPropertyOptional({
    description: 'role of the user',
    example: 'Regular',
    enum: UserRole,
  })
  @IsNotEmpty()
  @IsString()
  role!: UserRole
}
