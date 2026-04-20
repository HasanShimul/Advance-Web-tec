import { BuyerService } from "./buyer.service";
export declare class BuyerController {
    private readonly buyerService;
    constructor(buyerService: BuyerService);
    createBuyer(dto: any): Promise<{
        message: string;
    }>;
    updatePhone(id: number, phone: bigint): Promise<{
        success: boolean;
        id: number;
        phone: bigint;
    }>;
    getBuyersWithNullName(): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: import("./buyer.entity").Buyer[];
    }>;
    removeUser(id: number): Promise<{
        success: boolean;
        id: number;
    }>;
    getBuyerDashboard(): {
        message: string;
    };
}
