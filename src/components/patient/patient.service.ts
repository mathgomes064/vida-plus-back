import { Inject } from "@nestjs/common";
import { UUID } from "crypto";
import { IPatientRepository } from "./interfaces/patient.repository.interface";

export class PatientService {
    constructor(
        @Inject('IPatientRepository')
        private readonly repository: IPatientRepository) { }

    async findAllPatients(query: any): Promise<any> {
        return await this.repository.findAllPatients(query);
    }

    async createPatient(data: any): Promise<any> {
        return await this.repository.createPatient(data);
    }

    async updatePatient(id: UUID, data: any): Promise<any> {
        return await this.repository.updatePatient(id, data);
    }

    async deletePatient(id: UUID): Promise<any> {
        return await this.repository.deletePatient(id);
    }
}