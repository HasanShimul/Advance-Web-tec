import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { VerificationCode } from './verification.entity';
import { EmployeeService } from '../employee/employee.service';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AdminService {
    private adminRepo;
    private verificationRepo;
    private jwtService;
    private employeeService;
    private mailService;
    constructor(adminRepo: Repository<AdminEntity>, verificationRepo: Repository<VerificationCode>, jwtService: JwtService, employeeService: EmployeeService, mailService: MailerService);
    signup(body: any): Promise<{
        message: string;
    }>;
    login(email: any, password: any): Promise<{
        access_token: string;
    }>;
    createEmployee(body: any, user: any): Promise<{
        data: string;
    }>;
    findAllEmployee(id: number, name: string): Promise<import("../employee/employee.entity").Employee[] | {
        message: string;
    }>;
    findalladmin(): Promise<{
        message: string;
    }>;
    findallinActiveEmployee(): Promise<void>;
    removeEmployee(id: any, adminInfo: any): Promise<{
        message: string;
    }>;
    updateEmployee(email: any, name: any): Promise<{
        message: string;
    }>;
    updateAdminName(name: string, adminInfo: any): Promise<{
        message: string;
    }>;
    mailVerify(email: any, code: any): Promise<{
        message: string;
    }>;
    codeSendToMail(to: string, code: number): Promise<boolean>;
}
