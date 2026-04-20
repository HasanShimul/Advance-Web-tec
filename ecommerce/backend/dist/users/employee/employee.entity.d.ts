import { Department_Enum } from 'src/common/enum/department.enum';
import { Role } from 'src/common/enum/role.enum';
import { AdminEntity } from '../admin/admin.entity';
export declare class Employee {
    id: number;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    department: Department_Enum;
    position: Role;
    admin: AdminEntity;
}
