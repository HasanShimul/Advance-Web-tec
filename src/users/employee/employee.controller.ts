import { Body, Controller, Post, Patch, Param, Get, Query } from "@nestjs/common";
import { Employee } from "./employee.entity";
import { EmployeeService } from "./employee.service";
import { EmployeeDto } from "../dto/create-employee.dto";
import { EmployeeLoginDto } from "../dto/employeelogin.dto";
import { Role } from "src/common/enum/role.enum";
import { phoneDto } from "../dto/phone.dto";


@Controller('users/employee')
export class EmployeeController {
  constructor(
    private employeeservice: EmployeeService
  ) { }

  @Post('create')
  async create(@Body() body: EmployeeDto) {
    if(body.position != Role.ADMIN){
      return this.employeeservice.create(body);
    }else{
      return  {
        message:"You are not allowed for this position."
      }
    }
  }

  @Post('login')
  async loginEmployee(@Body() body: EmployeeLoginDto) {
     return await this.employeeservice.loginEmployee(body.username, body.password);
  }

  @Get('findall')
  async findAllEmployee() {
    return await this.employeeservice.findAllEmployee();
  }
@Post('change/phone') //need to do
async chagePhone(@Body() phone:phoneDto){
  return this.employeeservice.chagePhone(phone);
    
}

  // @Patch('update-country/:id')
  // async modifyCountry(@Param('id') id : string, @Body('country')country : string){
  //   return this.service.updateCountry(+id,country);
  // }

  // @Get('by-joining-date')
  // async getByJoiningDate(@Query('date') date: string) {
  //   return this.service.getByDate(date);
  // }

  // @Get('unknown')
  // async getUnknownCountry(){
  //   return this.service.getUnknownCountry();
  // }
}