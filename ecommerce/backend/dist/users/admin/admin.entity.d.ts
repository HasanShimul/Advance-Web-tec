import { VerificationCode } from './verification.entity';
import { Role } from 'src/common/enum/role.enum';
import { Employee } from '../employee/employee.entity';
export declare class AdminEntity {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    isVerified: boolean;
    city: string;
    role: Role;
    verificationCodes: VerificationCode[];
    employees: Employee[];
}
