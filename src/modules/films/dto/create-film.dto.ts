import { IsString, IsNotEmpty, IsDateString, IsArray, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateFilmDto {
  @ApiProperty({ example: 'A New Hope', description: 'The title of the film' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ example: 1, description: 'The episode id of the film' })
  @IsString()
  @IsNotEmpty()
  episode_id: number

  @ApiProperty({ example: 'George Lucas', description: 'The director of the film' })
  @IsString()
  @IsNotEmpty()
  director: string

  @ApiProperty({ example: '1977-05-25', description: 'The release date of the film' })
  @IsDateString()
  @IsNotEmpty()
  release_date: string

  @ApiProperty({ example: 'It is a period of civil war.', description: 'The opening crawl of the film' })
  @IsString()
  @IsNotEmpty()
  opening_crawl: string

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum', description: 'The producer(s) of the film' })
  @IsString()
  @IsNotEmpty()
  producer: string

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
