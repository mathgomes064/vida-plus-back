import { UUID } from "crypto";
import { IHospitalUnityRepository } from "./interfaces/hospitalUnity.repository.interface";
import { Inject } from "@nestjs/common";

export class HospitalUnityService {
    constructor(
        @Inject('IHospitalUnityRepository')
        private readonly repository: IHospitalUnityRepository) { }

    async findAllHospitalUnities(query: any): Promise<any> {
        return await this.repository.findAllHospitalUnities(query);
    }

    async createHospitalUnity(data: any): Promise<any> {
        return await this.repository.createHospitalUnity(data);
    }

    async updateHospitalUnity(id: UUID, data: any): Promise<any> {
        return await this.repository.updateHospitalUnity(id, data);
    }

    async deleteHospitalUnity(id: UUID): Promise<any> {
        return await this.repository.deleteHospitalUnity(id);
    }
}