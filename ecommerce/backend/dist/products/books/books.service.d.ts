import { Book } from './interfaces/book.interface';
export declare class BooksService {
    private books;
    create(book: any): {
        message: string;
        data: string;
    };
    findAll(): {
        data: string;
    };
    findOne(id: number): {
        data: string;
    };
    update(id: number, book: any): {
        message: string;
        data: any;
    };
    patch(id: number, book: any): {
        message: string;
        data: Book;
    };
    remove(): {
        message: string;
    };
    search(author: string): {
        data: string;
    };
}
