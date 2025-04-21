import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { UUID } from "crypto";
import { ServiceService } from "./service.service";
import { JwtAuthGuard } from "../auth/login/jwt.guard";
@Controller('service')
export class ServiceController {
    constructor(private readonly service: ServiceService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllServices(@Query() query: any): Promise<any> {
        return await this.service.findAllServices(query);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createService(@Body() data: any): Promise<any> {
        return await this.service.createService(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateService(
        @Param('id') id: UUID,
        @Body() data: any,
        @Request() req
    ): Promise<any> {
        const patientId = req.user.userId;
        return await this.service.updateService(id, data, patientId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteService(
        @Param('id') id: UUID,
        @Request() req
    ): Promise<any> {
        const patientId = req.user.userId;
        return await this.service.deleteService(id, patientId);
    }
}