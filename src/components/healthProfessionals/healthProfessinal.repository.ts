import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { IHealthProfessionalRepository } from "./interfaces/healthProfessional.repository.interface";

@Injectable()
export class HealthProfessionalRepository implements IHealthProfessionalRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAllHealthProfessionals(query: any): Promise<any> {
        return this.prisma.healthProfessional.findMany();
    }

    async createHealthProfessional(data: any): Promise<any> {
        const { name, cpf, password, isAdmin, hospitalUnitId, serviceType, professionalType } = data;

        try {
            return await this.prisma.healthProfessional.create({
                data: {
                    name,
                    cpf,
                    password,
                    isAdmin,
                    hospitalUnitId,
                    serviceType,
                    professionalType
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateHealthProfessional(id: UUID, data: any): Promise<any> {
        const { name, cpf, password, isAdmin, hospitalUnitId, serviceType, professionalType } = data;

        try {
            return await this.prisma.healthProfessional.update({
                data: {
                    name,
                    cpf,
                    password,
                    isAdmin,
                    hospitalUnitId,
                    serviceType,
                    professionalType
                },
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteHealthProfessional(id: UUID): Promise<any> {
        try {
            return await this.prisma.healthProfessional.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}