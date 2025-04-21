import { UUID } from "crypto";

export interface IHealthProfessionalRepository {
    generateFinancialReport(data: any): Promise<any>;
    findAllHealthProfessionals(query: any): Promise<any>;
    createHealthProfessional(data: any): Promise<any>;
    updateHealthProfessional(id: UUID, data: any, healthProfessionalId: string): Promise<any>;
    deleteHealthProfessional(id: UUID, healthProfessionalId: string): Promise<any>;
}