import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./employee.entity";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports:[AuthModule,
        TypeOrmModule.forFeature([Employee])],
    controllers:[EmployeeController],
    providers:[EmployeeService],
    exports:[EmployeeService]
})
export class EmployeeModule{}