import {  Matches,IsNotEmpty, IsEmail, MinLength, min } from "class-validator";
 
export class CreateAdminDto{
   
  
      @Matches(/^[A-Za-z\s]+$/, {
        message:'name only contains letters',
      })
      fullName:string;

      @IsNotEmpty({message:"email is required"})
      @IsEmail({},{ message:"Email should be and email"
      })
      email:string;

      @IsNotEmpty({message:"Password cann;t be empty"})
      @MinLength(5,{
        message:"password must be at least 5 character"
      })
      password:string;

      @IsNotEmpty({message:"Phone number is required"})
      @Matches(/^01[3-9]\d{8}$/,{
        message:"Must be a bangladeshi valid phone number"
      })
      phone:string;

      @IsNotEmpty({
        message:"City is required."
      })
      city:string;

}
