import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UUID } from "crypto";
import { HospitalUnityService } from "./hospitalUnity.service";

@Controller('hospital-unity')
export class HospitalUnityController {
    constructor(private readonly service: HospitalUnityService) {}

    @Get()
    async findAllHospitalUnities(@Query() query: any): Promise<any> {
        return await this.service.findAllHospitalUnities(query);
    }

    @Post()
    async createHospitalUnity(@Body() data: any): Promise<any> {
        return await this.service.createHospitalUnity(data);
    }

    @Put(":id")
    async updateHospitalUnity(@Param('id') id: UUID, @Body() data: any): Promise<any> {
        return await this.service.updateHospitalUnity(id, data);
    }

    @Delete(":id")
    async deleteHospitalUnity(@Param('id') id: UUID): Promise<any> {
        return await this.service.deleteHospitalUnity(id);
    }
}