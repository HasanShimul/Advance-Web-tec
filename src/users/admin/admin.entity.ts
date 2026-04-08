import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { VerificationCode } from './verification.entity';
import { Role } from 'src/common/enum/role.enum';
import { Employee } from '../employee/employee.entity';
import { Matches } from 'class-validator';

@Entity('admins')
export class AdminEntity {

  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column()
  phone: string;

  @Column({ default: false })
  isVerified: boolean

  @Column()
  city: string;

  @Column({
    type: 'enum',
    enum: Role,
   default: Role.ADMIN,
    
  })
  role: Role;

  @OneToMany(() => VerificationCode, (verification) => verification.admin)
  verificationCodes:VerificationCode[];

  @OneToMany(() => Employee, (employee) => employee.admin)
  employees : Employee[]

  // @OneToMany( () => Employee, (parameter) => parameter.admin)
  // employee:Employee[]
}
