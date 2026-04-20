import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";

export class LoginDto{
    @IsNotEmpty({
        message:"Email is required."
    })
    @IsEmail({},{
        message:"Email must be an email"
    })
    email:string;

    @IsNotEmpty({
        message:"Password is required."
    })
    @MinLength(5,{
        message:"Password should be  5 character"
    })
    password:string
}