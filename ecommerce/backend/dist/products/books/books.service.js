"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
let BooksService = class BooksService {
    books = [];
    create(book) {
        return { message: "Book created", data: "You have been added" };
    }
    findAll() {
        return { data: "Find all is successfully called" };
    }
    findOne(id) {
        return { data: "Find one book " + this.books[id] };
    }
    update(id, book) {
        return { message: "Book updated", data: book };
    }
    patch(id, book) {
        return { message: "Book patched", data: this.books[id] };
    }
    remove() {
        return { message: "Book deleted" };
    }
    search(author) {
        return {
            data: `You search for ${author}`,
        };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
//# sourceMappingURL=books.service.js.map