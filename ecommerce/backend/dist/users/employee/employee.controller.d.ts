import { Employee } from "./employee.entity";
import { EmployeeService } from "./employee.service";
import { EmployeeDto } from "../dto/create-employee.dto";
import { EmployeeLoginDto } from "../dto/employeelogin.dto";
import { phoneDto } from "../dto/phone.dto";
export declare class EmployeeController {
    private employeeservice;
    constructor(employeeservice: EmployeeService);
    create(body: EmployeeDto): Promise<{
        data: string;
    } | {
        message: string;
    }>;
    loginEmployee(body: EmployeeLoginDto): Promise<{
        access_token: string;
    }>;
    findAllEmployee(): Promise<Employee[]>;
    chagePhone(phone: phoneDto, req: any): Promise<{
        message: string;
    } | undefined>;
}
