import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { IHealthProfessionalRepository } from "./interfaces/healthProfessional.repository.interface";
import * as bcrypt from 'bcrypt';
@Injectable()
export class HealthProfessionalRepository implements IHealthProfessionalRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAllHealthProfessionals(query: any): Promise<any> {
        return this.prisma.healthProfessional.findMany();
    }

    async createHealthProfessional(data: any): Promise<any> {
        const { name, cpf, password, isAdmin, hospitalUnitId, serviceType, professionalType } = data;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return await this.prisma.healthProfessional.create({
                data: {
                    name,
                    cpf,
                    password: hashedPassword,
                    confirmPassword: password,
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
            const updateData: any = {
                name,
                cpf,
                isAdmin,
                hospitalUnitId,
                serviceType,
                professionalType,
              };
          
              if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateData.password = hashedPassword;
                updateData.confirmPassword = password;
              }
          
              return await this.prisma.healthProfessional.update({
                data: updateData,
                where: { id },
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