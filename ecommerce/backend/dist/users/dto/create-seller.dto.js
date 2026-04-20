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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSellerDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSellerDto {
    email;
    password;
    gender;
    phone;
}
exports.CreateSellerDto = CreateSellerDto;
__decorate([
    (0, class_validator_1.Matches)(/^[^\s@]+@aiub\.edu$/, {
        message: 'Email must contain aiub.edu domain',
    }),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.Matches)(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
    }),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['male', 'female']),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[0-9]+$/, {
        message: 'Phone number must contain only numbers',
    }),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "phone", void 0);
//# sourceMappingURL=create-seller.dto.js.map