import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity } from './admin.entity';
import { VerificationCode } from './verification.entity';
import { JwtModule } from '@nestjs/jwt';
 import { EmployeeModule } from '../employee/employee.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    PassportModule,AuthModule,
 
    TypeOrmModule.forFeature([AdminEntity,VerificationCode]),
    EmployeeModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {
 
}