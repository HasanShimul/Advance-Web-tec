import { Grocery } from './interfaces/grocery.interface';
export declare class GroceryService {
    private grocery;
    create(grocery: any): {
        message: string;
        data: any;
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
        data: Grocery;
    };
    remove(): {
        message: string;
    };
    search(author: string): {
        data: Grocery[];
    };
}
