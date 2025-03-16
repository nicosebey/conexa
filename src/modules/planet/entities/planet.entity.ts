import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('starship')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  climate: string

  @Column()
  diameter: string

  @Column()
  films: string

  @Column()
  gravity: string

  @Column()
  name: string

  @Column()
  orbital_period: number

  @Column()
  population: string

  @Column()
  residents: string // fk people

  @Column()
  rotation_period: string

  @Column()
  surface_water: string

  @Column()
  terrain: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null
}
