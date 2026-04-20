import { GroceryService } from './grocery.service';
import { CreateGrocerykDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocerydto';
export declare class GroceryController {
    private readonly groceryservice;
    constructor(groceryservice: GroceryService);
    create(dto: CreateGrocerykDto): {
        message: string;
        data: any;
    };
    findAll(): {
        data: string;
    };
    findOne(id: string): {
        data: string;
    };
    update(id: string, dto: UpdateGroceryDto): {
        message: string;
        data: any;
    };
    patch(id: string, dto: UpdateGroceryDto): {
        message: string;
        data: import("./interfaces/grocery.interface").Grocery;
    };
    remove(id: string): {
        message: string;
    };
    search(author: string): {
        data: import("./interfaces/grocery.interface").Grocery[];
    };
    hello(): {
        message: string;
    };
}
