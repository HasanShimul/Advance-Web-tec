"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPipe = void 0;
const common_1 = require("@nestjs/common");
class StatusPipe {
    transform(value) {
        if (value !== 'active' && value !== 'inactive') {
            throw new common_1.BadRequestException('Status must be active or inactive');
        }
        return value;
    }
}
exports.StatusPipe = StatusPipe;
//# sourceMappingURL=status.pipe.js.map