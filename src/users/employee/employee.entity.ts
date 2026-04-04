import { Department_Enum } from 'src/common/enum/department.enum';
 import { Role } from 'src/common/enum/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';

@Entity('employees')
export class Employee {

  @PrimaryGeneratedColumn()
  id: number;
   
  @Column()
  fullname:string;

  @Column()
  email:string;

 
  @Column()
  password:string;

  @Column()
  phone:string;

  @Column({
    type:'enum',
    enum:Department_Enum,
    default:Department_Enum.SALES
  })
  department:Department_Enum;

  @Column({
    type:'enum',
    enum:Role,
    default:Role.EMPLOYEE
  })
  position:Role;

  @ManyToOne(() => AdminEntity, (admin) => admin.employees,{
    nullable:true,
    onDelete:'SET NULL'
  })
  admin:AdminEntity;
}
