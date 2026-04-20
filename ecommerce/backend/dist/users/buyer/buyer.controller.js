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
exports.BuyerController = void 0;
const common_1 = require("@nestjs/common");
const buyer_service_1 = require("./buyer.service");
let BuyerController = class BuyerController {
    buyerService;
    constructor(buyerService) {
        this.buyerService = buyerService;
    }
    async createBuyer(dto) {
        return this.buyerService.create(dto);
    }
    updatePhone(id, phone) {
        return this.buyerService.updatePhone(id, phone);
    }
    async getBuyersWithNullName() {
        return this.buyerService.findNullName();
    }
    removeUser(id) {
        return this.buyerService.remove(id);
    }
    getBuyerDashboard() {
        return { message: 'Buyer dashboard' };
    }
};
exports.BuyerController = BuyerController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "createBuyer", null);
__decorate([
    (0, common_1.Patch)('phone/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, BigInt]),
    __metadata("design:returntype", void 0)
], BuyerController.prototype, "updatePhone", null);
__decorate([
    (0, common_1.Get)('null-names'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "getBuyersWithNullName", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BuyerController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuyerController.prototype, "getBuyerDashboard", null);
exports.BuyerController = BuyerController = __decorate([
    (0, common_1.Controller)('users/buyer'),
    __metadata("design:paramtypes", [buyer_service_1.BuyerService])
], BuyerController);
//# sourceMappingURL=buyer.controller.js.map