import { Controller, Get,Post,Put,Patch,Delete,Body,Param, Query } from '@nestjs/common';
  
  import { GroceryService } from './grocery.service';
  import { CreateGrocerykDto } from './dto/create-grocery.dto';
  import { UpdateGroceryDto } from './dto/update-grocerydto';
  
  @Controller('groceries')
  export class GroceryController {
    constructor(private readonly groceryservice: GroceryService) {}
  
    // 1
    @Post()
    create(@Body() dto:CreateGrocerykDto) {
       return this.groceryservice.create(dto);
       //return "Books created ,ok ??"
    }
  
    // 2
    @Get()
    findAll() {
      return this.groceryservice.findAll();
    }
  
    // 3
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.groceryservice.findOne(+id);
    }
  
    // 4
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateGroceryDto) {
      return this.groceryservice.update(+id, dto);
    }
  
    //5
    @Patch(':id')
    patch(@Param('id') id: string, @Body() dto: UpdateGroceryDto) {
      return this.groceryservice.patch(+id, dto);
    }
  
    //6
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.groceryservice.remove();
    }
  
 //7
    @Get()
    search(@Query('author') author: string) {
      return this.groceryservice.search(author);
    }
  
 //8
    @Get('hey-grocery')
    hello() {
      return { message: "Hello from Grocery API" };
    }
  }
  