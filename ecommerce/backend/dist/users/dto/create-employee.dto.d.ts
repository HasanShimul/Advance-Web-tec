import { Department_Enum } from "src/common/enum/department.enum";
import { Role } from "src/common/enum/role.enum";
export declare class EmployeeDto {
    fullname: string;
    email: string;
    phone: string;
    password: string;
    department: Department_Enum;
    position: Role;
}
