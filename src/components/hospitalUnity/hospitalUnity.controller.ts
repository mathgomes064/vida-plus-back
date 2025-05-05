import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UUID } from "crypto";
import { HospitalUnityService } from "./hospitalUnity.service";
import { JwtAuthGuard } from "../auth/login/jwt.guard";
import { IsProfessionalGuard } from "../auth/isProfessional/isProfessional.guard";

@Controller('hospital-unity')
export class HospitalUnityController {
    constructor(private readonly service: HospitalUnityService) {}

    @UseGuards(JwtAuthGuard, IsProfessionalGuard)
    @Get()
    async findAllHospitalUnities(@Query() query: any): Promise<any> {
        return await this.service.findAllHospitalUnities(query);
    }

    @UseGuards(JwtAuthGuard, IsProfessionalGuard)
    @Post()
    async createHospitalUnity(@Body() data: any): Promise<any> {
        return await this.service.createHospitalUnity(data);
    }

    @UseGuards(JwtAuthGuard, IsProfessionalGuard)
    @Put(":id")
    async updateHospitalUnity(@Param('id') id: UUID, @Body() data: any): Promise<any> {
        return await this.service.updateHospitalUnity(id, data);
    }

    @UseGuards(JwtAuthGuard, IsProfessionalGuard)
    @Delete(":id")
    async deleteHospitalUnity(@Param('id') id: UUID): Promise<any> {
        return await this.service.deleteHospitalUnity(id);
    }
}