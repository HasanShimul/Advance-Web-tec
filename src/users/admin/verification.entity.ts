import { Admin, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminEntity } from "./admin.entity";

@Entity('verificationCode')
export class VerificationCode{
@PrimaryGeneratedColumn()
id:number;


@Column()
email:string;

@Column()
verificationCode:number;

@Column({ type: 'timestamp',default:() => 'CURRENT_TIMESTAMP'})
expiredAt:Date;

@ManyToOne(() => AdminEntity, (admin) => admin.verificationCodes,{
    onDelete:'CASCADE',
})
admin:AdminEntity;

}