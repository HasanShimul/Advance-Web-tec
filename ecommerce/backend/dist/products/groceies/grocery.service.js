"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryService = void 0;
const common_1 = require("@nestjs/common");
let GroceryService = class GroceryService {
    grocery = [];
    create(grocery) {
        return { message: "Grocery is added ", data: grocery };
    }
    findAll() {
        return { data: "Find all is successfully called" };
    }
    findOne(id) {
        return { data: "Find one grocery " + this.grocery[id] };
    }
    update(id, book) {
        return { message: "grocery updated", data: book };
    }
    patch(id, book) {
        return { message: "grocery patched", data: this.grocery[id] };
    }
    remove() {
        return { message: "grocery deleted" };
    }
    search(author) {
        return {
            data: this.grocery.filter(b => b.author === author),
        };
    }
};
exports.GroceryService = GroceryService;
exports.GroceryService = GroceryService = __decorate([
    (0, common_1.Injectable)()
], GroceryService);
//# sourceMappingURL=grocery.service.js.map