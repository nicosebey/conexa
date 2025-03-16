import { PartialType, OmitType } from '@nestjs/mapped-types'
import { CreateFilmDto } from './create-film.dto'
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateFilmDto extends PartialType(OmitType(CreateFilmDto, ['producer', 'director'] as const)) {
  @ApiProperty({ example: 'A New Hope', description: 'Updated title of the film', required: false })
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({ example: '1977-05-25', description: 'The release date of the film', required: false })
  @IsDateString()
  @IsOptional()
  release_date?: string

  @ApiProperty({
    example: ['https://swapi.dev/api/characters/1', 'https://swapi.dev/api/characters/2'],
    description: 'IDs of the characters in the film',
    required: false,
  })
  @IsArray()
  @IsOptional()
  characters?: string[]

  @ApiProperty({
    example: ['https://swapi.dev/api/planets/1', 'https://swapi.dev/api/planets/2'],
    description: 'IDs of the planets in the film',
    required: false,
  })
  @IsArray()
  @IsOptional()
  planets?: string[]

  @ApiProperty({
    example: ['https://swapi.dev/api/starships/1', 'https://swapi.dev/api/starships/2'],
    description: 'IDs of the starships in the film',
    required: false,
  })
  @IsArray()
  @IsOptional()
  starships?: string[]

  @ApiProperty({
    example: ['https://swapi.dev/api/vehicles/1', 'https://swapi.dev/api/vehicles/2'],
    description: 'IDs of the vehicles in the film',
    required: false,
  })
  @IsArray()
  @IsOptional()
  vehicles?: string[]

  @ApiProperty({
    example: ['https://swapi.dev/api/species/1', 'https://swapi.dev/api/species/2'],
    description: 'IDs of the species in the film',
    required: false,
  })
  @IsArray()
  @IsOptional()
  species?: string[]
}
