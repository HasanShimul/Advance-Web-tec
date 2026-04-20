import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class EmployeeLoginDto{
    @IsNotEmpty({
        message:"must provide a  username."
    })
    @IsEmail({},{
        message:"username must be an email."
    })
    username:string;

    @IsNotEmpty({
        message:"must provide password."
    })
    @MinLength(5,{
        message:"password should be 5 character."
    })
    password:string;
}