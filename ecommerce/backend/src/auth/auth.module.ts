import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService) =>({
        secret:config.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:Number(config.get<string>('JWT_EXPIRE')),
        }
      }),
    })
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy,JwtModule],
})
export class AuthModule {}