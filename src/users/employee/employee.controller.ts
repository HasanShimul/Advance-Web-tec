import { Body, Controller, Post,Patch,Param, Get ,Query} from "@nestjs/common";
import { Employee } from "./employee.entity";
import { EmployeeService } from "./employee.service";
import { EmployeeDto } from "../dto/create-employee.dto";


@Controller('users/employee')
export class EmployeeController {
    constructor(
    private service:EmployeeService
    ) {}
  
    @Post('create')
    async create(@Body() body) {
      return this.service.create(body);
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