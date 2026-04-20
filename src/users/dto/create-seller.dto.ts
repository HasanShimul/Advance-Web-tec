import { IsEmail, Matches, MinLength, IsIn  } from "class-validator";

export class CreateSellerDto{
    @Matches(/^[^\s@]+@aiub\.edu$/, {
        message: 'Email must contain aiub.edu domain',
      })
      email: string;

      @MinLength(6)
      @Matches(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      password: string;

      @IsIn(['male', 'female'])
      gender: string;

      @Matches(/^[0-9]+$/, {
        message: 'Phone number must contain only numbers',
      })
      phone: string;

}