import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UUID } from "crypto";
import { ServiceService } from "./service.service";

@Controller('service')
export class ServiceController {
    constructor(private readonly service: ServiceService) {}

    @Get()
    async findAllServices(@Query() query: any): Promise<any> {
        return await this.service.findAllServices(query);
    }

    @Post()
    async createService(@Body() data: any): Promise<any> {
        return await this.service.createService(data);
    }

    @Put(":id")
    async updateService(@Param('id') id: UUID, @Body() data: any): Promise<any> {
        return await this.service.updateService(id, data);
    }

    @Delete(":id")
    async deleteService(@Param('id') id: UUID): Promise<any> {
        return await this.service.deleteService(id);
    }
}