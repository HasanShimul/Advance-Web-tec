import { IsEmail, IsEnum, IsNotEmpty, Matches, MinLength } from "class-validator";
import { Department_Enum } from "src/common/enum/department.enum";
import { Role } from "src/common/enum/role.enum";

export class EmployeeDto {
@IsNotEmpty()
@Matches((/^[A-Za-z\s]+$/),{
  message:'full name only contains letters.'
})
  fullname:string;

  @IsNotEmpty({message:"Email is required"})
  @IsEmail({},{message:"Email must be emal"})
  email:string;

  @IsNotEmpty()
  @Matches((/^01[3-9]\d{8}$/),{
    message:"Must be Bangladeshi valid phone number."
  })
 phone:string;

 @IsNotEmpty()
 @MinLength(5,{
  message:"Password min 5 character length"
 })
 password:string;

 @IsNotEmpty()
 @IsEnum(Department_Enum,{
  message:`allowed department: ${Department_Enum.SALES},${Department_Enum.IT},${Department_Enum.SUPPORT}`
 })
 department:Department_Enum;

 @IsNotEmpty()
 @IsEnum(Role,{
  message:`allowed position : ${Role.BUYER},${Role.EMPLOYEE},${Role.USER},${Role.SALESMAN}`
 })
position:Role;
}