import { Repository } from "typeorm";
import { Buyer } from "./buyer.entity";
export declare class BuyerService {
    private repo;
    constructor(repo: Repository<Buyer>);
    create(data: Partial<Buyer>): Promise<{
        message: string;
    }>;
    updatePhone(id: number, phone: bigint): Promise<{
        success: boolean;
        id: number;
        phone: bigint;
    }>;
    findNullName(): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: Buyer[];
    }>;
    remove(id: number): Promise<{
        success: boolean;
        id: number;
    }>;
}
