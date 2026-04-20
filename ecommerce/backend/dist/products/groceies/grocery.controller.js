"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryController = void 0;
const common_1 = require("@nestjs/common");
const grocery_service_1 = require("./grocery.service");
const create_grocery_dto_1 = require("./dto/create-grocery.dto");
const update_grocerydto_1 = require("./dto/update-grocerydto");
let GroceryController = class GroceryController {
    groceryservice;
    constructor(groceryservice) {
        this.groceryservice = groceryservice;
    }
    create(dto) {
        return this.groceryservice.create(dto);
    }
    findAll() {
        return this.groceryservice.findAll();
    }
    findOne(id) {
        return this.groceryservice.findOne(+id);
    }
    update(id, dto) {
        return this.groceryservice.update(+id, dto);
    }
    patch(id, dto) {
        return this.groceryservice.patch(+id, dto);
    }
    remove(id) {
        return this.groceryservice.remove();
    }
    search(author) {
        return this.groceryservice.search(author);
    }
    hello() {
        return { message: "Hello from Grocery API" };
    }
};
exports.GroceryController = GroceryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_grocery_dto_1.CreateGrocerykDto]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_grocerydto_1.UpdateGroceryDto]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_grocerydto_1.UpdateGroceryDto]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('author')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('hey-grocery'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GroceryController.prototype, "hello", null);
exports.GroceryController = GroceryController = __decorate([
    (0, common_1.Controller)('groceries'),
    __metadata("design:paramtypes", [grocery_service_1.GroceryService])
], GroceryController);
//# sourceMappingURL=grocery.controller.js.map