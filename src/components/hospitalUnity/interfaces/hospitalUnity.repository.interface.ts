import { UUID } from "crypto";

export interface IHospitalUnityRepository {
    findAllHospitalUnities(query: any): Promise<any>;
    createHospitalUnity(data: any): Promise<any>;
    updateHospitalUnity(id: UUID, data: any): Promise<any>;
    deleteHospitalUnity(id: UUID): Promise<any>;
}