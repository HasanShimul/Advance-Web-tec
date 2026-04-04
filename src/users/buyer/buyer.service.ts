import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";
import { Buyer } from "./buyer.entity";

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer)
    private repo: Repository<Buyer>
  ) { }

  async create(data: Partial<Buyer>) {
    const buyer = this.repo.create(data);   
    await this.repo.save(buyer);
    return { message: "buyer created" };
  }

  async updatePhone(id: number, phone: bigint) {
    const result = await this.repo.update(id, { phone });
    if (result.affected === 0) {
      throw new NotFoundException(`Buyer with ID ${id} not found`);
    }
    return { success: true, id, phone };
  }

  async findNullName() {
    const users = await this.repo.find({
      where: { fullName: IsNull() }
    });
    if(users.length === 0){
      return {message : "No user is found"};
    }
    return{
      message : `${users.length} users found`,
      data : users
    };
  }
  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Buyer with ID ${id} not found`);
    }
    return { success: true, id };
  }
}