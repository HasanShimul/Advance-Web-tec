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
exports.FruitsController = void 0;
const common_1 = require("@nestjs/common");
const fruits_service_1 = require("./fruits.service");
const create_fruit_dto_1 = require("./dto/create-fruit.dto");
const update_fruit_dto_1 = require("./dto/update-fruit.dto");
let FruitsController = class FruitsController {
    fruitsService;
    constructor(fruitsService) {
        this.fruitsService = fruitsService;
    }
    create(dto) {
        return this.fruitsService.create(dto);
    }
    findAll() {
        return this.fruitsService.findAll();
    }
    findOne(id) {
        return this.fruitsService.findOne(+id);
    }
    update(id, dto) {
        return this.fruitsService.update(+id, dto);
    }
    patch(id, dto) {
        return this.fruitsService.patch(+id, dto);
    }
    remove(id) {
        return this.fruitsService.remove(+id);
    }
    search(color) {
        return this.fruitsService.search(color);
    }
    hello() {
        return { message: "Hello from Fruits API" };
    }
};
exports.FruitsController = FruitsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fruit_dto_1.CreateFruitDto]),
    __metadata("design:returntype", void 0)
], FruitsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FruitsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FruitsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fruit_dto_1.UpdateFruitDto]),
    __metadata("design:returntype", void 0)
], FruitsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fruit_dto_1.UpdateFruitDto]),
    __metadata("design:returntype", void 0)
], FruitsController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FruitsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('search/by-color'),
    __param(0, (0, common_1.Query)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FruitsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('hello/world'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FruitsController.prototype, "hello", null);
exports.FruitsController = FruitsController = __decorate([
    (0, common_1.Controller)('fruits'),
    __metadata("design:paramtypes", [fruits_service_1.FruitsService])
], FruitsController);
//# sourceMappingURL=fruits.controller.js.map