import { Repository } from "typeorm";
import { Employee } from "./employee.entity";
import { JwtService } from '@nestjs/jwt';
import { EmployeeDto } from "../dto/create-employee.dto";
export declare class EmployeeService {
    private readonly employeeRepo;
    private jwtService;
    constructor(employeeRepo: Repository<Employee>, jwtService: JwtService);
    create(data: EmployeeDto, user?: any): Promise<{
        data: string;
    }>;
    loginEmployee(username: string, password: string): Promise<{
        access_token: string;
    }>;
    findAllEmployee(adminid?: number): Promise<Employee[]>;
    findEmployeeBy(id: number): Promise<Employee | null>;
    deleteEmployee(id: number): Promise<{
        message: string;
    }>;
    chagePhone(phone: any, email: any): Promise<{
        message: string;
    } | undefined>;
    updateEmployeeName(name: string, email: string): Promise<{
        message: string;
    }>;
}
