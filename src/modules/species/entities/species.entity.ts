import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('starship')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  average_height: string

  @Column()
  average_lifespan: string

  @Column()
  classification: string

  @Column()
  eye_colors: string

  @Column()
  hair_colors: string

  @Column()
  homeworld: number //fk planet

  @Column()
  language: string

  @Column()
  name: string

  @Column()
  people: string

  @Column()
  films: string

  @Column()
  skin_colors: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null
}
