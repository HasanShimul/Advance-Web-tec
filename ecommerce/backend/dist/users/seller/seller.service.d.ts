import { Repository } from "typeorm";
import { Seller } from "./seller.entity";
export declare class SellerService {
    private repo;
    constructor(repo: Repository<Seller>);
}
