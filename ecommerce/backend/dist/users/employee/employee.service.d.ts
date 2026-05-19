import { Repository } from "typeorm";
import { Employee } from "./employee.entity";
import { JwtService } from '@nestjs/jwt';
import { EmployeeDto } from "../dto/create-employee.dto";
import { PusherService } from "src/pusher/pusher.service";
export declare class EmployeeService {
    private readonly employeeRepo;
    private readonly pusherService;
    private jwtService;
    constructor(employeeRepo: Repository<Employee>, pusherService: PusherService, jwtService: JwtService);
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
