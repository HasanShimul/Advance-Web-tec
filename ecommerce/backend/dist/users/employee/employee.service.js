"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const role_enum_1 = require("../../common/enum/role.enum");
const rxjs_1 = require("rxjs");
let EmployeeService = class EmployeeService {
    employeeRepo;
    jwtService;
    constructor(employeeRepo, jwtService) {
        this.employeeRepo = employeeRepo;
        this.jwtService = jwtService;
    }
    async create(data, user) {
        let admin = undefined;
        const { fullname, email, phone, password, department, position } = data;
        const userExist = await this.employeeRepo.findOne({
            where: { email },
        });
        if (userExist) {
            throw new common_1.BadRequestException(`employee already exist with ${email}`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        if (user && user.role == role_enum_1.Role.ADMIN) {
            admin = { id: user.id };
        }
        const employee = this.employeeRepo.create({
            fullname, email, phone, department, position,
            password: hashPassword, admin
        });
        const saveEmployee = await this.employeeRepo.save(employee);
        if (user && user.role == role_enum_1.Role.ADMIN) {
            return {
                data: `employee ${saveEmployee.fullname} is created with email ${email} by admin ${user.name}`
            };
        }
        return {
            data: `Employee ${saveEmployee.fullname} is created successfull with username: ${email}`
        };
    }
    async loginEmployee(username, password) {
        const employeeEsist = await this.employeeRepo.findOne({
            where: {
                email: username
            }
        });
        if (!employeeEsist) {
            throw new common_1.BadRequestException(`username not found`);
        }
        const isMatched = await bcrypt.compare(password, employeeEsist.password);
        if (!isMatched) {
            throw new common_1.BadRequestException(`Invalid cedentials.`);
        }
        const payload = {
            id: employeeEsist.id,
            name: employeeEsist.fullname,
            email: employeeEsist.email,
            department: employeeEsist.department,
            role: employeeEsist.position
        };
        const token = await this.jwtService.signAsync(payload);
        console.log("Employee token:", token);
        return {
            access_token: token
        };
    }
    async findAllEmployee(adminid) {
        if (adminid) {
            return this.employeeRepo.find({
                where: { admin: { id: adminid } }
            });
        }
        return this.employeeRepo.find();
    }
    async findEmployeeBy(id) {
        return await this.employeeRepo.findOne({
            where: { id },
            relations: ['admin']
        });
    }
    async deleteEmployee(id) {
        const result = await this.employeeRepo.delete({ id });
        if (result.affected == 0) {
            throw new common_1.BadRequestException('can not delete employee');
        }
        else {
            return {
                message: `Employee deleted `
            };
        }
    }
    async chagePhone(phone, email) {
        const userExist = await this.employeeRepo.findOne({
            where: { email }
        });
        if (!userExist) {
            throw new rxjs_1.NotFoundError('user does not exist');
        }
        userExist.phone = phone;
        console.log("phone:", typeof phone);
        const result = await this.employeeRepo.save(userExist);
        if (result) {
            return {
                message: `phone number: ${phone} is updated for ${email}`
            };
        }
    }
    async updateEmployeeName(name, email) {
        const employeeExist = await this.employeeRepo.findOne({
            where: {
                email
            },
            relations: ['admin']
        });
        if (!employeeExist) {
            throw new common_1.BadRequestException(`No employee is found to update name`);
        }
        employeeExist.fullname = name;
        const result = await this.employeeRepo.save(employeeExist);
        if (result) {
            return {
                message: `employee ${name} is upadted using admin ${employeeExist.admin.fullName}`
            };
        }
        throw new common_1.BadRequestException(`Can not update employee name`);
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map