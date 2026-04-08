import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { UsersResponse } from '../dto/interface/admin-response.interface';
import { VerificationCode } from './verification.entity';
import { EmployeeService } from '../employee/employee.service';
import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,

    @InjectRepository(VerificationCode)
    private verificationRepo: Repository<VerificationCode>,

    private jwtService: JwtService,
    private employeeService:EmployeeService
  ) { }


  async signup(body) {
    const { fullName, email, password, phone, city } = body;

    const userExist = await this.adminRepo.findOne({
      where: { email },
    });

    if (userExist) {
      throw new BadRequestException(`User already registered for ${email}`);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const admin = await this.adminRepo.create({
      fullName, email, phone, city,
      password: hashPassword,
    });
    const saveUser = await this.adminRepo.save(admin);


    const verificationcode = Math.floor(100000 + Math.random() * 900000);
    await this.verificationRepo.save({
      email,
      verificationCode: verificationcode,
      admin: { id: saveUser.id }
    });



    return {
      message: `admin is created successfully with ${email}`,
      data: `verification code : ${verificationcode}`
    };


  }

  async login(email, password) {

    const user = await this.adminRepo.findOne({
      where: { email }
    })
    if (!user) {
      throw new BadRequestException('User not found');

    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      verified:user.isVerified
    }
    const token = await this.jwtService.signAsync(payload);
    console.log("Token: " ,token);
    return {
      access_token: token
    };

  }


  async createEmployee(body,user) {
    if(user.role !== Role.ADMIN){
      throw new ForbiddenException('only admin can create employee');
    }

   return this.employeeService.create(body,user);
  }

  async findAllEmployee(id: number ,name:string) {
    // const employees = await  this.employee.find({
    //   where:{admin:{id:adminId}}
    // })
    // if(employees.length == 0){
    //   return {
    //       message:`No employee is found under admin ${name} `
    //   }
    // }

    const emplyees = await this.employeeService.findAllEmployee(Number(id));
    if(emplyees.length == 0){
      return {
        message:`no employee is found under admin ${name}`
      }
    }
    else{
      return emplyees;
    }


  }


  async findalladmin() {
    return {
      message: "all admin founded"
    };
  }


  async findallinActiveEmployee() { }

  async removeEmployee(id,adminInfo) { 
    
    const employee = await this.employeeService.findEmployeeBy(id);
     
    if(!employee){
      throw new NotFoundException(`Employee with id :${id} not found`);
    }
    if(employee.admin.id == adminInfo.id){
     const result =  this.employeeService.deleteEmployee(id);
     //console.log("result : " ,result);
     return {
      message: `Employee ${employee.fullname} is deleted by admin : ${adminInfo.name}`
     }
    }
    
    throw new ForbiddenException(`admin: ${adminInfo.fullName} is not permited to delete employee: ${employee.fullname}`);
  }


  async updateEmployee(body) { }



  async mailVerify(email, code) {
    const userFound = await this.verificationRepo.findOne({
      where: { email },
      relations: ['admin']
    });
    if (userFound) {
      if (userFound.verificationCode === Number(code)) {
        await this.adminRepo.update(userFound.admin.id, { isVerified: true })
        await this.verificationRepo.delete(userFound.id);
        return {
          message: "Email is verified"
        }
      }

      throw new BadRequestException(`verification code is wrong ${code}`);

    }
    return {
      message: "User not found."
    }
  }


  //   async create(data) {
  //     //const user = await this.repo.save(data);
  //     return {
  //       message: "admin creation is successful",
  //       data: data
  //     };
  //   }

  // async changeStatus(id: number, status: 'active' | 'inactive') {

  //   const user = await this.repo.findOne({ where: { id } });
  //   if (!user) {
  //     return { message: `No user is found with id : ${id}` };
  //   }
  //   user.status = status;
  //   const updateUser = await this.repo.save(user);

  //   return {
  //     message: `status is updated :${status}`,
  //     data: updateUser
  //   };
  // }

  // async  getInactive() {
  //     const userInactive = await this.repo.find({ where: { status: 'inactive' } });
  //     if(userInactive.length === 0 ){
  //       return{
  //         message:"There is no inactive user"
  //       };
  //     }
  //     return {
  //       data:userInactive
  //     };
  //   }

  //   async getOlder40(): Promise<UsersResponse> {
  //     const usersOver40: AdminEntity[] = await this.repo.find({
  //       where: { age: MoreThan(40) },
  //     });

  //     if (usersOver40.length === 0) {
  //       return {
  //         message: "No user more than 40 is found",

  //       };
  //     }
  //     return {
  //       message:"User more than 40  " ,
  //       data: usersOver40,
  //     };
  //   }
}