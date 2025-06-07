import { BadRequestException, Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { IHealthProfessionalRepository } from "./interfaces/healthProfessional.repository.interface";
import * as bcrypt from 'bcrypt';
@Injectable()
export class HealthProfessionalRepository implements IHealthProfessionalRepository {
    constructor(private readonly prisma: PrismaService) { }

    async generateFinancialReport(data: any): Promise<any> {
        const { hospitalUnityId } = data;
        try {
            if (!hospitalUnityId) {
                return `Unidade hospitalar não disponibilizada`;
            }

            const selectUnity = await this.prisma.hospitalUnity.findFirst({
                where: {
                    id: hospitalUnityId,
                },
            });

            if (!selectUnity) {
                return `Unidade hospitalar com ID ${hospitalUnityId} não encontrada.`;
            }

            return {
                "Hospital": selectUnity.name,
                "Leitos disponíveis": selectUnity.beds,
                "Relatório financeiro": selectUnity.financialReport,
                "Suprimentos restantes": selectUnity.supplies,
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAllHealthProfessionals(query: any): Promise<any> {
        return this.prisma.healthProfessional.findMany({
            include: {
                services: true,
            }
        });
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

    async updateHealthProfessional(id: UUID, data: any, healthProfessionalId: string): Promise<any> {
        const { name, cpf, password, isAdmin, hospitalUnitId, serviceType, professionalType } = data;

        try {

            if (id !== healthProfessionalId) {
                throw new BadRequestException('Você não tem permissão para editar este perfil.');
            }

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

    async deleteHealthProfessional(id: UUID, healthProfessionalId: string): Promise<any> {
        try {
            if (id !== healthProfessionalId) {
                throw new BadRequestException('Você não tem permissão para editar este perfil.');
            }

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