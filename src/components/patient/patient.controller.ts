import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UUID } from "crypto";
import { PatientService } from "./patient.service";
import { JwtAuthGuard } from "../auth/login/jwt.guard";

@Controller('patient')
export class PatientController {
    constructor(private readonly service: PatientService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllPatients(@Query() query: any): Promise<any> {
        return await this.service.findAllPatients(query);
    }

    @Post()
    async createPatient(@Body() data: any): Promise<any> {
        return await this.service.createPatient(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updatePatient(@Param('id') id: UUID, @Body() data: any): Promise<any> {
        return await this.service.updatePatient(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deletePatient(@Param('id') id: UUID): Promise<any> {
        return await this.service.deletePatient(id);
    }
}