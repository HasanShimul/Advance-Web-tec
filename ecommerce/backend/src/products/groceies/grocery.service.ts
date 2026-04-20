import { Injectable } from '@nestjs/common';
import { Grocery } from './interfaces/grocery.interface';


 
@Injectable()
export class GroceryService {

    private grocery: Grocery[] = [];


    create(grocery) { 
        return { message: "Grocery is added ", data: grocery };
    }

    findAll() {
        return { data: "Find all is successfully called"};
    }

    findOne(id: number) {
        return { data: "Find one grocery "+this.grocery[id] };
    }

    update(id: number, book) {
      
        return { message: "grocery updated", data: book };
    }

    patch(id: number, book) {
        return { message: "grocery patched", data: this.grocery[id] };
    }

    remove() {
        return { message: "grocery deleted" };
    }

    search(author: string) {
        return {
            data: this.grocery.filter(b => b.author === author),
        };
    }
}
