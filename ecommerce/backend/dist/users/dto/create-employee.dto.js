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
exports.EmployeeDto = void 0;
const class_validator_1 = require("class-validator");
class EmployeeDto {
    fullname;
    email;
    phone;
    password;
    department;
    position;
}
exports.EmployeeDto = EmployeeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)((/^[A-Za-z\s]+$/), {
        message: 'full name only contains letters.'
    }),
    __metadata("design:type", String)
], EmployeeDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Email is required" }),
    (0, class_validator_1.IsEmail)({}, { message: "Email must be emal" }),
    __metadata("design:type", String)
], EmployeeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)((/^01[3-9]\d{8}$/), {
        message: "Must be Bangladeshi valid phone number."
    }),
    __metadata("design:type", String)
], EmployeeDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5, {
        message: "Password min 5 character length"
    }),
    __metadata("design:type", String)
], EmployeeDto.prototype, "password", void 0);
//# sourceMappingURL=create-employee.dto.js.map