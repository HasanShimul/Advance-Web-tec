import { IsNotEmpty, Matches } from "class-validator";

export class phoneDto{
    @IsNotEmpty({
        message:"phone can't be empty"
    })
    @Matches(/^01[3-9]\d{8}$/,{
        message:"Must be valid bangladeshi phone number"
    })
    phone:string;
}