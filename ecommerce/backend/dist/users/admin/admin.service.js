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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
const verification_entity_1 = require("./verification.entity");
const employee_service_1 = require("../employee/employee.service");
const role_enum_1 = require("../../common/enum/role.enum");
const mailer_1 = require("@nestjs-modules/mailer");
let AdminService = class AdminService {
    adminRepo;
    verificationRepo;
    jwtService;
    employeeService;
    mailService;
    constructor(adminRepo, verificationRepo, jwtService, employeeService, mailService) {
        this.adminRepo = adminRepo;
        this.verificationRepo = verificationRepo;
        this.jwtService = jwtService;
        this.employeeService = employeeService;
        this.mailService = mailService;
    }
    async signup(body) {
        const { fullName, email, password, phone, city } = body;
        const userExist = await this.adminRepo.findOne({
            where: { email },
        });
        if (userExist) {
            throw new common_1.BadRequestException(`User already registered for ${email}`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const admin = await this.adminRepo.create({
            fullName, email, phone, city,
            password: hashPassword,
        });
        const verificationcode = Math.floor(100000 + Math.random() * 900000);
        console.log("EMAIL:", process.env.FROM_EMAIL);
        console.log("PASS:", process.env.APP_PASSWORD);
        const isMailed = await this.codeSendToMail(email, verificationcode);
        const saveUser = await this.adminRepo.save(admin);
        await this.verificationRepo.save({
            email,
            verificationCode: verificationcode,
            admin: { id: saveUser.id }
        });
        if (!isMailed) {
            throw new common_1.BadRequestException('Verification code send fails');
        }
        return {
            message: `Admin ${saveUser.fullName} is created successfull. Verification code send to ${saveUser.email}`
        };
    }
    async login(email, password) {
        const user = await this.adminRepo.findOne({
            where: { email }
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const payload = {
            id: user.id,
            name: user.fullName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            verified: user.isVerified
        };
        const token = await this.jwtService.signAsync(payload);
        console.log("Token: ", token);
        return {
            access_token: token
        };
    }
    async createEmployee(body, user) {
        if (user.role !== role_enum_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('only admin can create employee');
        }
        return this.employeeService.create(body, user);
    }
    async findAllEmployee(id, name) {
        const emplyees = await this.employeeService.findAllEmployee(Number(id));
        if (emplyees.length == 0) {
            return {
                message: `no employee is found under admin ${name}`
            };
        }
        else {
            return emplyees;
        }
    }
    async findalladmin() {
        return {
            message: "all admin founded"
        };
    }
    async findallinActiveEmployee() { }
    async removeEmployee(id, adminInfo) {
        const employee = await this.employeeService.findEmployeeBy(id);
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with id :${id} not found`);
        }
        if (employee.admin.id == adminInfo.id) {
            const result = this.employeeService.deleteEmployee(id);
            return {
                message: `Employee ${employee.fullname} is deleted by admin : ${adminInfo.name}`
            };
        }
        throw new common_1.ForbiddenException(`admin: ${adminInfo.fullName} is not permited to delete employee: ${employee.fullname}`);
    }
    async updateEmployee(email, name) {
        return this.employeeService.updateEmployeeName(name, email);
    }
    async updateAdminName(name, adminInfo) {
        const adminExist = await this.adminRepo.findOne({
            where: { email: adminInfo.email }
        });
        if (!adminExist) {
            throw new common_1.BadRequestException(`amdin not founded : ${adminInfo.email}`);
        }
        adminExist.fullName = name;
        const result = await this.adminRepo.save(adminExist);
        if (result) {
            return {
                message: `${name} is sucessfully updated`
            };
        }
        throw new common_1.BadRequestException('You can not update name');
    }
    async mailVerify(email, code) {
        const userFound = await this.verificationRepo.findOne({
            where: { email },
            relations: ['admin']
        });
        if (userFound) {
            if (String(userFound.verificationCode) === String(code).trim()) {
                await this.adminRepo.update(userFound.admin.id, { isVerified: true });
                await this.verificationRepo.delete(userFound.id);
                return {
                    message: "Email is verified"
                };
            }
            throw new common_1.BadRequestException(`verification code is wrong ${code}`);
        }
        return {
            message: "User not found."
        };
    }
    async codeSendToMail(to, code) {
        try {
            await this.mailService.sendMail({
                to,
                subject: "Email Verification Code from ABC ecommerce.",
                text: `You email verification code is ${code}.Please dont share it with anyone`,
            });
            return true;
        }
        catch (error) {
            console.log("Mail sending fail", error);
            return false;
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(verification_entity_1.VerificationCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        employee_service_1.EmployeeService,
        mailer_1.MailerService])
], AdminService);
//# sourceMappingURL=admin.service.js.map