import { Controller, Get,Post,Put,Patch,Delete,Body,Param, Query } from '@nestjs/common';
  
  import { BooksService } from './books.service';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    // 1
    @Post()
    create(@Body() dto:CreateBookDto) {
       return this.booksService.create(dto);
       //return "Books created ,ok ??"
    }
  
    // 2
    @Get()
    findAll() {
      return this.booksService.findAll();
    }
  
    // 3
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.booksService.findOne(+id);
    }
  
    // 4
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
      return this.booksService.update(+id, dto);
    }
  
    //5
    @Patch(':id')
    patch(@Param('id') id: string, @Body() dto: UpdateBookDto) {
      return this.booksService.patch(+id, dto);
    }
  
    //6
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.booksService.remove();
    }
  
 //7
    @Get('search/by-author')
    search(@Query('author') author: string) {
      return this.booksService.search(author);
    }
  
 //8
    @Get('hello-world')
    hello() {
      return { message: "Hello from Books API" };
    }
  }
  