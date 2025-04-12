import { UUID } from "crypto";

export interface IHealthProfessionalRepository {
    findAllHealthProfessionals(query: any): Promise<any>;
    createHealthProfessional(data: any): Promise<any>;
    updateHealthProfessional(id: UUID, data: any): Promise<any>;
    deleteHealthProfessional(id: UUID): Promise<any>;
}