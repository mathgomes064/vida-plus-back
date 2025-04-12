import { Inject } from "@nestjs/common";
import { UUID } from "crypto";
import { IServiceRepository } from "./interfaces/service.repository.interface";

export class ServiceService {
    constructor(
        @Inject('IServiceRepository')
        private readonly repository: IServiceRepository) { }

    async findAllServices(query: any): Promise<any> {
        return await this.repository.findAllServices(query);
    }

    async createService(data: any): Promise<any> {
        let prisceForService = 0;
        let supplies = 0;

        if (data.service === "CONSULTATIONS"){
            prisceForService = 100
            supplies = 10
        }else if (data.service === "EXAMS"){
            prisceForService = 200
            supplies = 20
        }else if (data.service === "MEDICAL_RECORDS"){
            prisceForService = 150
            supplies = 15
        }else if (data.service === "TELEMEDICINE"){
            prisceForService = 50
            supplies = 0
        }

        return await this.repository.createService(data, prisceForService, supplies);
    }

    async updateService(id: UUID, data: any): Promise<any> {
        return await this.repository.updateService(id, data);
    }

    async deleteService(id: UUID): Promise<any> {
        return await this.repository.deleteService(id);
    }
}