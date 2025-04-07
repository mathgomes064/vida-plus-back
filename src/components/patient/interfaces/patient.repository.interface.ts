import { UUID } from "crypto";

export interface IPatientRepository {
    findAllPatients(query: any): Promise<any>;
    createPatient(data: any): Promise<any>;
    updatePatient(id: UUID, data: any): Promise<any>;
    deletePatient(id: UUID): Promise<any>;
}