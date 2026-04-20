import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(dto: CreateBookDto): {
        message: string;
        data: string;
    };
    findAll(): {
        data: string;
    };
    findOne(id: string): {
        data: string;
    };
    update(id: string, dto: UpdateBookDto): {
        message: string;
        data: any;
    };
    patch(id: string, dto: UpdateBookDto): {
        message: string;
        data: import("./interfaces/book.interface").Book;
    };
    remove(id: string): {
        message: string;
    };
    search(author: string): {
        data: string;
    };
    hello(): {
        message: string;
    };
}
