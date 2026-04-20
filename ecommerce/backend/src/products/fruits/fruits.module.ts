import { Module } from '@nestjs/common';
import { FruitsController } from './fruits.controller';
import { FruitsService } from './fruits.service';

@Module({
  controllers: [FruitsController],
  providers: [FruitsService],
})
export class FruitsModule { }
