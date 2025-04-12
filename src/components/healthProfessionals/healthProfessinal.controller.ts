import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UUID } from "crypto";
import { HealthProfessionalService } from "./healthProfessinal.service";
import { JwtAuthGuard } from "../auth/login/jwt.guard";
import { IsAdminGuard } from "../auth/isAdmin/isAdmin.guard";

@Controller('health-professional')
export class HealthProfessionalController {
    constructor(private readonly service: HealthProfessionalService) {}

    @UseGuards(JwtAuthGuard, IsAdminGuard)
    @Get('/financial-report')
    async generateFinancialReport(@Query() query: any): Promise<any> {
        return await this.service.generateFinancialReport(query);
    }

    @Get()
    async findAllHealthProfessionals(@Query() query: any): Promise<any> {
        return await this.service.findAllHealthProfessionals(query);
    }

    @Post()
    async createHealthProfessional(@Body() data: any): Promise<any> {
        return await this.service.createHealthProfessional(data);
    }

    @Put(":id")
    async updateHealthProfessional(@Param('id') id: UUID, @Body() data: any): Promise<any> {
        return await this.service.updateHealthProfessional(id, data);
    }

    @Delete(":id")
    async deleteHealthProfessional(@Param('id') id: UUID): Promise<any> {
        return await this.service.deleteHealthProfessional(id);
    }
}