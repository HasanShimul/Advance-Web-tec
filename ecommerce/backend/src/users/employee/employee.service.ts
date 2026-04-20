import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { Employee } from "./employee.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmployeeDto } from "../dto/create-employee.dto";
import { Role } from "src/common/enum/role.enum";
import { NotFoundError } from "rxjs";
import { AuthWeakPasswordError } from "@supabase/supabase-js";

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    private jwtService: JwtService,
  ) { }

  async create(data: EmployeeDto, user?: any) {

    let admin: { id: number } | undefined = undefined;
    const { fullname, email, phone, password, department, position } = data;

    const userExist = await this.employeeRepo.findOne({
      where: { email },
    });

    if (userExist) {
      throw new BadRequestException(`employee already exist with ${email}`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    if (user && user.role == Role.ADMIN) {
      admin = { id: user.id };
    }
    const employee = this.employeeRepo.create({
      fullname, email, phone, department, position,
      password: hashPassword, admin
    });

    const saveEmployee = await this.employeeRepo.save(employee);
    if (user && user.role == Role.ADMIN) {
      return {
        data: `employee ${saveEmployee.fullname} is created with email ${email} by admin ${user.name}`
      }
    }
    return {
      data: `Employee ${saveEmployee.fullname} is created successfull with username: ${email}`
    }
  }


  async loginEmployee(username: string, password: string) {

    const employeeEsist = await this.employeeRepo.findOne({
      where: {
        email: username
      }
    });

    if (!employeeEsist) {
      throw new BadRequestException(`username not found`);
    }
    const isMatched = await bcrypt.compare(password, employeeEsist.password);

    if (!isMatched) {
      throw new BadRequestException(`Invalid cedentials.`);
    }

    const payload = {
      id: employeeEsist.id,
      name: employeeEsist.fullname,
      email: employeeEsist.email,
      department: employeeEsist.department,
      role: employeeEsist.position
    }

    const token = await this.jwtService.signAsync(payload);
    console.log("Employee token:", token);
    return {
      access_token: token
    };


  }

  async findAllEmployee(adminid?: number) {
    if (adminid) {
      return this.employeeRepo.find({
        where: { admin: { id: adminid } }
      });
    }
    return this.employeeRepo.find();
  }


  async findEmployeeBy(id: number) {
    return await this.employeeRepo.findOne({
      where: { id },
      relations: ['admin']
    });

  }
  async deleteEmployee(id: number) {

    const result = await this.employeeRepo.delete({ id });

    if (result.affected == 0) {
      throw new BadRequestException('can not delete employee');
    } else {
      return {
        message: `Employee deleted `
      }
    }
  }


  async chagePhone(phone, email) {
    const userExist = await this.employeeRepo.findOne({
      where: { email }
    });
    if (!userExist) {
      throw new NotFoundError('user does not exist');
    }
    userExist.phone = phone;
    console.log("phone:", typeof phone);
    const result = await this.employeeRepo.save(userExist);
    if (result) {
      return {
        message: `phone number: ${phone} is updated for ${email}`
      }
    }
  }


  async updateEmployeeName(name:string,email:string){
    const employeeExist = await this.employeeRepo.findOne({
      where:{
        email
      },
      relations:['admin']
    });  
    if(!employeeExist){
      throw new BadRequestException(`No employee is found to update name`);
    }

    employeeExist.fullname = name;
    const result = await this.employeeRepo.save(employeeExist);

    if(result){
      return{
        message:`employee ${name} is upadted using admin ${employeeExist.admin.fullName}`
      }
    }
    throw new BadRequestException(`Can not update employee name`);
  }



}