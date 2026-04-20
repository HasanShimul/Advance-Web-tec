"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhonePipe = void 0;
const common_1 = require("@nestjs/common");
class PhonePipe {
    transform(value) {
        if (!/^\d+$/.test(value)) {
            throw new common_1.BadRequestException('Phone must contain numbers only');
        }
        return BigInt(value);
    }
}
exports.PhonePipe = PhonePipe;
//# sourceMappingURL=phone.pipe.js.map