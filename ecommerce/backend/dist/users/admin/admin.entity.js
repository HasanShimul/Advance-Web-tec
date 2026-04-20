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
exports.AdminEntity = void 0;
const typeorm_1 = require("typeorm");
const verification_entity_1 = require("./verification.entity");
const role_enum_1 = require("../../common/enum/role.enum");
const employee_entity_1 = require("../employee/employee.entity");
let AdminEntity = class AdminEntity {
    id;
    fullName;
    email;
    password;
    phone;
    isVerified;
    city;
    role;
    verificationCodes;
    employees;
};
exports.AdminEntity = AdminEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], AdminEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AdminEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: role_enum_1.Role,
        default: role_enum_1.Role.ADMIN,
    }),
    __metadata("design:type", String)
], AdminEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => verification_entity_1.VerificationCode, (verification) => verification.admin),
    __metadata("design:type", Array)
], AdminEntity.prototype, "verificationCodes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (employee) => employee.admin),
    __metadata("design:type", Array)
], AdminEntity.prototype, "employees", void 0);
exports.AdminEntity = AdminEntity = __decorate([
    (0, typeorm_1.Entity)('admins')
], AdminEntity);
//# sourceMappingURL=admin.entity.js.map