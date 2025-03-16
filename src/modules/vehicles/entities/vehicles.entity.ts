import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('starship')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  model: string

  @Column()
  cargo_capacity: number

  @Column()
  cost_in_credits: number

  @Column()
  consumables: string

  @Column()
  crew: number

  @Column()
  length: number

  @Column()
  manufacturer: string

  @Column()
  max_atmosphering_speed: string

  @Column()
  passengers: number

  @Column()
  films: string

  @Column()
  pilots: string

  @Column()
  vehicle_class: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null
}
