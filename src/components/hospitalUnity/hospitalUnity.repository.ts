import { UUID } from "crypto";
import { IHospitalUnityRepository } from "./interfaces/hospitalUnity.repository.interface";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HospitalUnityRepository implements IHospitalUnityRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAllHospitalUnities(query: any): Promise<any> {
        return this.prisma.hospitalUnity.findMany();
    }

    async createHospitalUnity(data: any): Promise<any> {
        const { name, address, beds, financialReport, supplies } = data;

        try {
            return await this.prisma.hospitalUnity.create({
                data: {
                    name,
                    address,
                    beds,
                    financialReport,
                    supplies
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateHospitalUnity(id: UUID, data: any): Promise<any> {
        const { name, address, beds, financialReport, supplies } = data;

        try {
            return await this.prisma.hospitalUnity.update({
                data: {
                    name,
                    address,
                    beds,
                    financialReport,
                    supplies
                },
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteHospitalUnity(id: UUID): Promise<any> {
        try {
            return await this.prisma.hospitalUnity.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}