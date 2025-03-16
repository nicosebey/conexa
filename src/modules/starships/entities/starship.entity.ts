import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('starship')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  MGLT: string

  @Column()
  cargo_capacity: string

  @Column()
  cost_in_credits: string

  @Column()
  consumables: string

  @Column()
  crew: number

  @Column()
  hyperdrive_rating: string

  @Column()
  length: string

  @Column()
  manufacturer: string

  @Column()
  max_atmosphering_speed: string

  @Column()
  model: string

  @Column()
  passengers: string

  @Column()
  films: string

  @Column()
  pilots: string

  @Column()
  starship_class: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null
}
