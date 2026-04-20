import { Entity,PrimaryColumn,Column,BeforeInsert } from "typeorm";

@Entity('sellers')
export class Seller {

  @PrimaryColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 150 })
  fullName: string;

  @Column({ default: false })
  isActive: boolean;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 100000);
  }
}