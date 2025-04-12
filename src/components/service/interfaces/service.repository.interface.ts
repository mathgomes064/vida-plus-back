import { UUID } from "crypto";

export interface IServiceRepository {
    findAllServices(query: any): Promise<any>;
    createService(data: any, prisceForService: number, supplies: number): Promise<any>;
    updateService(id: UUID, data: any): Promise<any>;
    deleteService(id: UUID): Promise<any>;
}