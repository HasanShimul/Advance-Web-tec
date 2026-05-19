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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PusherService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pusher_1 = __importDefault(require("pusher"));
let PusherService = class PusherService {
    config;
    pusher;
    constructor(config) {
        this.config = config;
        this.pusher = new pusher_1.default({
            appId: this.config.get('PUSHER_APP_ID'),
            key: this.config.get('PUSHER_KEY'),
            secret: this.config.get('PUSHER_SECRET'),
            cluster: this.config.get('PUSHER_CLUSTER'),
            useTLS: true,
        });
    }
    async triggerEmployeeCreated(employeeName) {
        await this.pusher.trigger('admin-channel', 'employee-created', {
            message: `New employee created: ${employeeName}`,
            employeeName,
        });
    }
};
exports.PusherService = PusherService;
exports.PusherService = PusherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PusherService);
//# sourceMappingURL=pusher.service.js.map