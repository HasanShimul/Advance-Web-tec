"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FruitsService = void 0;
const common_1 = require("@nestjs/common");
let FruitsService = class FruitsService {
    fruits = [];
    create(fruit) {
        this.fruits.push(fruit);
        return { message: "Fruit created", data: fruit };
    }
    findAll() {
        return { data: "Fruit GET called" };
    }
    findOne(id) {
        return { data: this.fruits[id] };
    }
    update(id, fruit) {
        this.fruits[id] = fruit;
        return { message: "Fruit updated", data: fruit };
    }
    patch(id, fruit) {
        this.fruits[id] = { ...this.fruits[id], ...fruit };
        return { message: "Fruit patched", data: this.fruits[id] };
    }
    remove(id) {
        this.fruits.splice(id, 1);
        return { message: "Fruit deleted" };
    }
    search(color) {
        return {
            data: this.fruits.filter(f => f.color === color),
        };
    }
};
exports.FruitsService = FruitsService;
exports.FruitsService = FruitsService = __decorate([
    (0, common_1.Injectable)()
], FruitsService);
//# sourceMappingURL=fruits.service.js.map