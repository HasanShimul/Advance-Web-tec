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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const create_employee_dto_1 = require("../dto/create-employee.dto");
const employeelogin_dto_1 = require("../dto/employeelogin.dto");
const role_enum_1 = require("../../common/enum/role.enum");
const phone_dto_1 = require("../dto/phone.dto");
const jwt_roles_guard_1 = require("../../auth/jwt-roles.guard");
let EmployeeController = class EmployeeController {
    employeeservice;
    constructor(employeeservice) {
        this.employeeservice = employeeservice;
    }
    async create(body) {
        if (body.position != role_enum_1.Role.ADMIN) {
            return this.employeeservice.create(body);
        }
        else {
            return {
                message: "You are not allowed for this position."
            };
        }
    }
    async loginEmployee(body) {
        return await this.employeeservice.loginEmployee(body.username, body.password);
    }
    async findAllEmployee() {
        return await this.employeeservice.findAllEmployee();
    }
    async chagePhone(phone, req) {
        if (req.user.role == role_enum_1.Role.EMPLOYEE) {
            return this.employeeservice.chagePhone(phone.phone, req.user.email);
        }
        else {
            throw new common_1.BadRequestException('You can not chnage phone number.');
        }
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.EmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employeelogin_dto_1.EmployeeLoginDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "loginEmployee", null);
__decorate([
    (0, common_1.Get)('findall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "findAllEmployee", null);
__decorate([
    (0, common_1.UseGuards)(jwt_roles_guard_1.JwtRoleGuard),
    (0, common_1.Patch)('change/phone'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phone_dto_1.phoneDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "chagePhone", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('users/employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map