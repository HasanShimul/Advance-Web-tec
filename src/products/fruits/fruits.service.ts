import { Injectable } from '@nestjs/common';
import { Fruit } from './interfaces/fruit.interface';

@Injectable()
export class FruitsService {
    private fruits: Fruit[] = [];

    create(fruit: Fruit) {
        this.fruits.push(fruit);
        return { message: "Fruit created", data: fruit };
    }

    findAll() {
        return { data: "Fruit GET called" };
    }

    findOne(id: number) {
        return { data: this.fruits[id] };
    }

    update(id: number, fruit: Fruit) {
        this.fruits[id] = fruit;
        return { message: "Fruit updated", data: fruit };
    }

    patch(id: number, fruit: Partial<Fruit>) {
        this.fruits[id] = { ...this.fruits[id], ...fruit };
        return { message: "Fruit patched", data: this.fruits[id] };
    }

    remove(id: number) {
        this.fruits.splice(id, 1);
        return { message: "Fruit deleted" };
    }

    search(color: string) {
        return {
            data: this.fruits.filter(f => f.color === color),
        };
    }
}
