import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Seller } from "./seller.entity";

@Injectable()
export class SellerService {

  constructor(
    @InjectRepository(Seller)
    private repo: Repository<Seller>
  ) {}

 
}