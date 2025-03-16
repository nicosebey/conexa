import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('film')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  episode_id: number

  @Column({ unique: true })
  title: string

  @Column()
  director: string

  @Column()
  producer: string

  @Column()
  release_date: string

  @Column()
  opening_crawl: string

  @Column('text', { array: true })
  characters: string[]

  @Column('text', { array: true })
  starships: string[]

  @Column('text', { array: true })
  vehicles: string[]

  @Column('text', { array: true })
  species: string[]

  @Column('text', { array: true })
  planets: string[]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null
}
