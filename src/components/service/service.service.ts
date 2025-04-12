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
        return await this.repository.createService(data);
    }

    async updateService(id: UUID, data: any): Promise<any> {
        return await this.repository.updateService(id, data);
    }

    async deleteService(id: UUID): Promise<any> {
        return await this.repository.deleteService(id);
    }
}