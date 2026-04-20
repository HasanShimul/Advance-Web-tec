import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';


 
@Injectable()
export class BooksService {

    private books: Book[] = [];


    create(book) { 
        return { message: "Book created", data: "You have been added"};
    }

    findAll() {
        return { data: "Find all is successfully called"};
    }

    findOne(id: number) {
        return { data: "Find one book "+this.books[id] };
    }

    update(id: number, book) {
      
        return { message: "Book updated", data: book };
    }

    patch(id: number, book) {
        return { message: "Book patched", data: this.books[id] };
    }

    remove() {
        return { message: "Book deleted" };
    }

    search(author: string) {
        return {
            data: `You search for ${author}`,
        };
    }
}
