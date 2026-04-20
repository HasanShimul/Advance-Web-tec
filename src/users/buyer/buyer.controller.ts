import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common";
import { BuyerService } from "./buyer.service";

@Controller('users/buyer')
export class BuyerController {
    constructor(private readonly buyerService: BuyerService) { }

    @Post('create')
    async createBuyer(@Body() dto) {
        return this.buyerService.create(dto);
    }

    @Patch('phone/:id')
    updatePhone(@Param('id') id: number, @Body('phone') phone: bigint) {
        return this.buyerService.updatePhone(id, phone);
    }
    @Get('null-names')
    async getBuyersWithNullName() {
        return this.buyerService.findNullName();
    }

    @Delete(':id')
    removeUser(@Param('id') id: number) {
        return this.buyerService.remove(id);
    }

    @Get()
    getBuyerDashboard() {
        return { message: 'Buyer dashboard' };
    }
}