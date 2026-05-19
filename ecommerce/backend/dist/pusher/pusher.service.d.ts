import { ConfigService } from '@nestjs/config';
export declare class PusherService {
    private config;
    private pusher;
    constructor(config: ConfigService);
    triggerEmployeeCreated(employeeName: string): Promise<void>;
}
