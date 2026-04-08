import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { Employee } from "./employee.entity";
import * as bcrypt from 'bcrypt';
import { EmployeeDto } from "../dto/create-employee.dto";
import { Role } from "src/common/enum/role.enum";

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
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
    return {
      data: `employee ${saveEmployee.fullname} is created with email ${email} by admin ${user.name}`
    }
  }


  async findAllEmployee(id ?:number){
    if(id){
      return this.employeeRepo.find({
        where:{admin:{id:id}}
      });
    }
    return this.employeeRepo.find();
  }


  async findEmployeeBy(id:number){
      return await this.employeeRepo.findOne({
        where:{id},
        relations:['admin']
      });
    
  }
  async deleteEmployee(id:number){
    return await this.employeeRepo.delete({id});
  }
  // async updateCountry(id: number, country: string) {
  //   const result = await  this.employeeRepo.update(id, { country });
  //   if(result.affected === 0 ){
  //     return{
  //       message : `No user is found with id ${id}`
  //     };

  //   }
  //   return{
  //     message:`updated user with id ${id} and country ${country}`
  //   };

  // }

  // async getByDate(date: string) {

  //   const start = new Date(date);
  //    start.setHours(0, 0, 0, 0);


  //   const end = new Date(date);
  //    end.setHours(23, 59, 59, 999);

  //   const users = await this.employeeRepo.find({
  //     where: {
  //       joiningDate: Between(start, end),
  //     },
  //   });

  //   if (users.length === 0) {
  //     return { message: `No users found for ${date}` };
  //   }

  //   return {
  //     message: `${users.length} users found for ${date}`,
  //     data: users,
  //   };
  // }



  // async getUnknownCountry() {
  //   const unknownUsers = await this.employeeRepo.find({
  //     where : {
  //       country:'Unknown'
  //     }
  //   })
  //   if(unknownUsers.length === 0 ){
  //     return{
  //       message :"No user with unknown country is found"
  //     };
  //   }
  //   return{
  //     message : `there are total ${unknownUsers.length} users with unknown country`,
  //     data:unknownUsers
  //   };
  // }


}