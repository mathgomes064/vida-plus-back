import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { UUID } from "crypto";
import { HealthProfessionalService } from "./healthProfessinal.service";
import { JwtAuthGuard } from "../auth/login/jwt.guard";
import { IsAdminGuard } from "../auth/isAdmin/isAdmin.guard";
import { IsProfessionalGuard } from "../auth/isProfessional/isProfessional.guard";

@Controller('health-professional')
export class HealthProfessionalController {
    constructor(private readonly service: HealthProfessionalService) { }

    @UseGuards(JwtAuthGuard, IsProfessionalGuard, IsAdminGuard)
    @Get('/financial-report')
    async generateFinancialReport(@Query() query: any): Promise<any> {
        return await this.service.generateFinancialReport(query);
    }

    @UseGuards(JwtAuthGuard, IsProfessionalGuard)
    @Get()
    async findAllHealthProfessionals(@Query() query: any): Promise<any> {
        return await this.service.findAllHealthProfessionals(query);
    }

    @Post()
    async createHealthProfessional(@Body() data: any): Promise<any> {
        return await this.service.createHealthProfessional(data);
    }

    @UseGuards(JwtAuthGuard, IsProfessionalGuard)
    @Put(":id")
    async updateHealthProfessional(
        @Param('id') id: UUID,
        @Body() data: any,
        @Request() req
    ): Promise<any> {
        const healthProfessionalId = req.user.userId;
        return await this.service.updateHealthProfessional(id, data, healthProfessionalId);
    }

    @UseGuards(JwtAuthGuard, IsProfessionalGuard)
    @Delete(":id")
    async deleteHealthProfessional(
        @Param('id') id: UUID,
        @Request() req
    ): Promise<any> {
        const healthProfessionalId = req.user.userId;
        return await this.service.deleteHealthProfessional(id, healthProfessionalId);
    }
}