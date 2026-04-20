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
exports.CreateAdminDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAdminDto {
    fullName;
    email;
    password;
    phone;
    city;
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z\s]+$/, {
        message: 'name only contains letters',
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "email is required" }),
    (0, class_validator_1.IsEmail)({}, { message: "Email should be and email"
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Password cann;t be empty" }),
    (0, class_validator_1.MinLength)(5, {
        message: "password must be at least 5 character"
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Phone number is required" }),
    (0, class_validator_1.Matches)(/^01[3-9]\d{8}$/, {
        message: "Must be a bangladeshi valid phone number"
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: "City is required."
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "city", void 0);
//# sourceMappingURL=create-admin.dto.js.map