import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

@Entity('buyers')
export class Buyer {

  @PrimaryColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'bigint', unsigned: true })
  phone: bigint;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 100000);
  }
}