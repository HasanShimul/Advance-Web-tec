import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService:ConfigService) {
    console.log('jwt secret:',configService.get<string>('JWT_SECRET'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'), 
      //secretOrKey:process.env.JWT_SECRET,
     
      
    });
    console.log("Extract JWT :",ExtractJwt.fromAuthHeaderAsBearerToken());
    console.log("Secret : ",configService.get<string>('JWT_SECRET'));
    
  }

  async validate(payload: any) {
    console.log("Payload: ",payload);
    return  payload
  }
}