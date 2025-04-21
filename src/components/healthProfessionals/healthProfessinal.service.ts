import { Inject } from "@nestjs/common";
import { UUID } from "crypto";
import { IHealthProfessionalRepository } from "./interfaces/healthProfessional.repository.interface";

export class HealthProfessionalService {
    constructor(
        @Inject('IHealthProfessionalRepository')
        private readonly repository: IHealthProfessionalRepository) { }

    async generateFinancialReport(query: any): Promise<any> {
        return await this.repository.generateFinancialReport(query);
    }

    async findAllHealthProfessionals(query: any): Promise<any> {
        return await this.repository.findAllHealthProfessionals(query);
    }

    async createHealthProfessional(data: any): Promise<any> {
        return await this.repository.createHealthProfessional(data);
    }

    async updateHealthProfessional(id: UUID, data: any, healthProfessionalId: UUID): Promise<any> {
        return await this.repository.updateHealthProfessional(id, data, healthProfessionalId);
    }

    async deleteHealthProfessional(id: UUID, healthProfessionalId: UUID): Promise<any> {
        return await this.repository.deleteHealthProfessional(id, healthProfessionalId);
    }
}