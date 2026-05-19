import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./employee.entity";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { AuthModule } from "src/auth/auth.module";
import { PusherService } from "src/pusher/pusher.service";


@Module({
    imports:[AuthModule,
        TypeOrmModule.forFeature([Employee])],
    controllers:[EmployeeController],
    providers:[EmployeeService,PusherService],
    exports:[EmployeeService]
})
export class EmployeeModule{}