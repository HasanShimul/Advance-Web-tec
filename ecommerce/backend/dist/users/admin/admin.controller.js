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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const create_admin_dto_1 = require("../dto/create-admin.dto");
const login_dto_1 = require("../dto/login.dto");
const create_employee_dto_1 = require("../dto/create-employee.dto");
const jwt_roles_guard_1 = require("../../auth/jwt-roles.guard");
const role_enum_1 = require("../../common/enum/role.enum");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async singup(body) {
        return this.adminService.signup(body);
    }
    async loginin(logindto) {
        return this.adminService.login(logindto.email, logindto.password);
    }
    async createEmployee(body, req) {
        if ((req.user.role === role_enum_1.Role.ADMIN) && (req.user.verified == true)) {
            return this.adminService.createEmployee(body, req.user);
        }
        throw new common_1.ForbiddenException(`${req.user.name} id not allowed to create employee`);
    }
    async findallEmployee(req) {
        if ((req.user.role === role_enum_1.Role.ADMIN) && (req.user.verified == true)) {
            return this.adminService.findAllEmployee(req.user.id, req.user.fullName);
        }
        throw new common_1.ForbiddenException(`${req.user.name} you are not allowed to search all employee.Please login as admin with verified account.`);
    }
    async findoneById(id) {
    }
    async findoneByName(name) {
        if (!name) {
            throw new Error("You have to pass a name");
        }
    }
    async findallActiveEmployee(status) {
    }
    async findallinActiveEmployee() {
        return this.adminService.findallinActiveEmployee();
    }
    async updateEmployee(email, name) {
        return this.adminService.updateEmployee(email, name);
    }
    async updateName(body, id, req) {
        if ((req.user.role == role_enum_1.Role.ADMIN) && (req.user.verified == true)) {
            return await this.adminService.updateAdminName(body.name, req.user);
        }
        else {
            throw new common_1.ForbiddenException(`You are not permited to change name.`);
        }
    }
    async removeEmployee(id, req) {
        if ((req.user.role == role_enum_1.Role.ADMIN) && (req.user.verified == true)) {
            return this.adminService.removeEmployee(id, req.user);
        }
        else {
            throw new common_1.ForbiddenException(`PLease try from verified admin account`);
        }
    }
    async mailVerify(email, code) {
        return this.adminService.mailVerify(email, code);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "singup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "loginin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_roles_guard_1.JwtRoleGuard),
    (0, common_1.Post)('signup/employee'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.EmployeeDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.UseGuards)(jwt_roles_guard_1.JwtRoleGuard),
    (0, common_1.Get)('find/employees/all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findallEmployee", null);
__decorate([
    (0, common_1.Get)('find/employee/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findoneById", null);
__decorate([
    (0, common_1.Get)('find/name'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findoneByName", null);
__decorate([
    (0, common_1.Get)('find/employee/active'),
    __param(0, (0, common_1.Query)('active', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findallActiveEmployee", null);
__decorate([
    (0, common_1.Get)('find/employee/inactive'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findallinActiveEmployee", null);
__decorate([
    (0, common_1.Put)('employee/:id'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.UseGuards)(jwt_roles_guard_1.JwtRoleGuard),
    (0, common_1.Patch)('update/name/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateName", null);
__decorate([
    (0, common_1.UseGuards)(jwt_roles_guard_1.JwtRoleGuard),
    (0, common_1.Delete)('delete/employee/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeEmployee", null);
__decorate([
    (0, common_1.Patch)('verify/email'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "mailVerify", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map