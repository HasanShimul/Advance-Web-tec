import { Controller, Post, Get, Body, Patch, Param, UsePipes, Query, ParseBoolPipe, ParseIntPipe, Put, Delete, Req, UseGuards, ForbiddenException } from "@nestjs/common";
import { AdminService } from './admin.service';
import { CreateAdminDto } from "../dto/create-admin.dto";
import { LoginDto } from "../dto/login.dto";
import { EmployeeDto } from "../dto/create-employee.dto";
 import { JwtRoleGuard } from "src/auth/jwt-roles.guard";
import { Role } from "src/common/enum/role.enum";


@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) { }

  @Post('signup')
  async singup(@Body() body: CreateAdminDto) {
    return this.adminService.signup(body);
  }

  @Post('login')
  async loginin(
    @Body() logindto: LoginDto,

  ) {
    return this.adminService.login(logindto.email, logindto.password);
  }

  @UseGuards(JwtRoleGuard)
  @Post('signup/employee')
  async createEmployee(@Body() body: EmployeeDto, @Req() req) {

    if ((req.user.role === Role.ADMIN) && (req.user.verified == true)) {

      return this.adminService.createEmployee(body, req.user);

    }
    throw new ForbiddenException(`${req.user.name} id not allowed to create employee`);
    // 
  }


  @UseGuards(JwtRoleGuard)
  @Get('find/employees/all')
  async findallEmployee(@Req() req) {
    if ((req.user.role === Role.ADMIN) && (req.user.verified == true)) {
     
      return this.adminService.findAllEmployee(req.user.id, req.user.fullName);
    }
    throw new ForbiddenException(`${req.user.name} you are not allowed to search all employee.Please login as admin with verified account.`)
  }

  @Get('find/employee/:id')
  async findoneById(@Param('id', ParseIntPipe) id: number) {

  }
  @Get('find/name')
  async findoneByName(@Query('name') name: string) {
    if (!name) {
      throw new Error("You have to pass a name");
    }
  }

  @Get('find/employee/active')
  async findallActiveEmployee(@Query('active', ParseBoolPipe) status: boolean) {

  }

  @Get('find/employee/inactive')
  async findallinActiveEmployee() {
    return this.adminService.findallinActiveEmployee();
  }


  @Put('employee/:id')
  async updateEmployee(@Body() body: string) {
    return this.adminService.updateEmployee(body);
  }

  @UseGuards(JwtRoleGuard)
  @Patch('update/name/:id')
  async updateName(@Body() body ,@Param('id', ParseIntPipe) id : number , @Req() req) {

    if((req.user.role == Role.ADMIN ) && (req.user.verified == true)){
        
      return await this.adminService.updateAdminName(body.name , req.user);
      // return{
      //     body,id,
      //     user:req.user,
      //     ip:req.ip,
      //     method:req.method,
      //     url:req.url,
      //   }
    }
    else{
      throw new ForbiddenException(`You are not permited to change name.`);
    }
 
  }

  @UseGuards(JwtRoleGuard)
  @Delete('delete/employee/:id')
  async removeEmployee(@Param('id', ParseIntPipe) id: number,@Req() req) {
    if((req.user.role == Role.ADMIN) && (req.user.verified == true)){
       return this.adminService.removeEmployee(id,req.user);
    }
    else{
      throw new ForbiddenException(`PLease try from verified admin account`);
    }
  }


  @Patch('verify/email')
  async mailVerify(
    @Body('email') email: string,
    @Body('code') code: string
  ) {
    return this.adminService.mailVerify(email, code);
  }
}