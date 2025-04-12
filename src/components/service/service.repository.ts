import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { IServiceRepository } from "./interfaces/service.repository.interface";

@Injectable()
export class ServiceRepository implements IServiceRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAllServices(query: any): Promise<any> {
        return this.prisma.service.findMany();
    }

    async createService(data: any): Promise<any> {
        const { description, serviceDate, hospitalUnitId, serviceType, healthProfessionalId } = data;

        try {
            return await this.prisma.service.create({
                data: {
                    description,
                    serviceDate,
                    hospitalUnitId,
                    serviceType,
                    healthProfessionalId
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateService(id: UUID, data: any): Promise<any> {
        const { description, serviceDate, hospitalUnitId, isServiceCompleted, serviceType, healthProfessionalId } = data;

        try {
            return await this.prisma.service.update({
                data: {
                    description,
                    serviceDate,
                    hospitalUnitId,
                    serviceType,
                    healthProfessionalId,
                    isServiceCompleted
                },
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteService(id: UUID): Promise<any> {
        try {
            return await this.prisma.service.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}