import { Matches, MinLength } from "class-validator";

export class CreateBuyerDto{
    @Matches(/^[A-Za-z0-9 ]+$/, {
        message: 'Name must not contain special characters',
      })
      name: string;

      @MinLength(6)
      @Matches(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      password: string;

      @Matches(/^01[0-9]+$/, {
        message: 'Phone number must start with 01',
      })
      phone: string;
}