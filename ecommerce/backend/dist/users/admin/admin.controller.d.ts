import { AdminService } from './admin.service';
import { CreateAdminDto } from "../dto/create-admin.dto";
import { LoginDto } from "../dto/login.dto";
import { EmployeeDto } from "../dto/create-employee.dto";
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    singup(body: CreateAdminDto): Promise<{
        message: string;
    }>;
    loginin(logindto: LoginDto): Promise<{
        access_token: string;
    }>;
    createEmployee(body: EmployeeDto, req: any): Promise<{
        data: string;
    }>;
    findallEmployee(req: any): Promise<import("../employee/employee.entity").Employee[] | {
        message: string;
    }>;
    findoneById(id: number): Promise<void>;
    findoneByName(name: string): Promise<void>;
    findallActiveEmployee(status: boolean): Promise<void>;
    findallinActiveEmployee(): Promise<void>;
    updateEmployee(email: string, name: string): Promise<{
        message: string;
    }>;
    updateName(body: any, id: number, req: any): Promise<{
        message: string;
    }>;
    removeEmployee(id: number, req: any): Promise<{
        message: string;
    }>;
    mailVerify(email: string, code: string): Promise<{
        message: string;
    }>;
}
