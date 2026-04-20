import { Controller,Get,Post,Put,Patch,Delete,Body,Param,Query } from '@nestjs/common';

import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) { }


  @Post()
  create(@Body() dto: CreateFruitDto) {
    return this.fruitsService.create(dto);
  }


  @Get()
  findAll() {
    return this.fruitsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitsService.findOne(+id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFruitDto) {
    return this.fruitsService.update(+id, dto as any);
  }


  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: UpdateFruitDto) {
    return this.fruitsService.patch(+id, dto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitsService.remove(+id);
  }


  @Get('search/by-color')
  search(@Query('color') color: string) {
    return this.fruitsService.search(color);
  }

  @Get('hello/world')
  hello() {
    return { message: "Hello from Fruits API" };
  }
}
