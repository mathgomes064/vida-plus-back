import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { IPatientRepository } from "./interfaces/patient.repository.interface";

@Injectable()
export class PatientRepository implements IPatientRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAllPatients(query: any): Promise<any> {
        return this.prisma.patient.findMany();
    }

    async createPatient(data: any): Promise<any> {
        const { name, cpf, password, hospitalUnitId } = data;

        try {
            return await this.prisma.patient.create({
                data: {
                    name,
                    cpf,
                    password,
                    hospitalUnitId,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updatePatient(id: UUID, data: any): Promise<any> {
        const { name, cpf, password, hospitalUnitId } = data;

        try {
            return await this.prisma.patient.update({
                data: {
                    name,
                    cpf,
                    password,
                    hospitalUnitId,
                },
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deletePatient(id: UUID): Promise<any> {
        try {
            return await this.prisma.patient.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}