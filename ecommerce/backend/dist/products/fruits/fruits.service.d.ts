import { Fruit } from './interfaces/fruit.interface';
export declare class FruitsService {
    private fruits;
    create(fruit: Fruit): {
        message: string;
        data: Fruit;
    };
    findAll(): {
        data: string;
    };
    findOne(id: number): {
        data: Fruit;
    };
    update(id: number, fruit: Fruit): {
        message: string;
        data: Fruit;
    };
    patch(id: number, fruit: Partial<Fruit>): {
        message: string;
        data: Fruit;
    };
    remove(id: number): {
        message: string;
    };
    search(color: string): {
        data: Fruit[];
    };
}
