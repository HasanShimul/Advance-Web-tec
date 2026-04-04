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

  create(data) {
    return this.repo.save(data);
  }

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  findByFullName(text: string) {
    return this.repo
      .createQueryBuilder("seller")
      .where("seller.fullName LIKE :text", { text: `%${text}%` })
      .getMany();
  }

  remove(username: string) {
    return this.repo.delete({ username });
  }
}