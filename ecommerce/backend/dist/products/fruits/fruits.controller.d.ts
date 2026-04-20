import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
export declare class FruitsController {
    private readonly fruitsService;
    constructor(fruitsService: FruitsService);
    create(dto: CreateFruitDto): {
        message: string;
        data: import("./interfaces/fruit.interface").Fruit;
    };
    findAll(): {
        data: string;
    };
    findOne(id: string): {
        data: import("./interfaces/fruit.interface").Fruit;
    };
    update(id: string, dto: UpdateFruitDto): {
        message: string;
        data: import("./interfaces/fruit.interface").Fruit;
    };
    patch(id: string, dto: UpdateFruitDto): {
        message: string;
        data: import("./interfaces/fruit.interface").Fruit;
    };
    remove(id: string): {
        message: string;
    };
    search(color: string): {
        data: import("./interfaces/fruit.interface").Fruit[];
    };
    hello(): {
        message: string;
    };
}
