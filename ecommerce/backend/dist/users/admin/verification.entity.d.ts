import { AdminEntity } from "./admin.entity";
export declare class VerificationCode {
    id: number;
    email: string;
    verificationCode: number;
    expiredAt: Date;
    admin: AdminEntity;
}
