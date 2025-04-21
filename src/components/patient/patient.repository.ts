import { BadRequestException, Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { IPatientRepository } from "./interfaces/patient.repository.interface";
import * as bcrypt from 'bcrypt';
@Injectable()
export class PatientRepository implements IPatientRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAllPatients(query: any): Promise<any> {
        return this.prisma.patient.findMany({
            include: {
                services: true,
            }
        });
    }

    async createPatient(data: any): Promise<any> {
        const { name, cpf, password, hospitalUnitId } = data;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const existedCpf = await this.prisma.patient.findFirst({
                where: {
                    cpf: cpf
                }
            })

            if (existedCpf) throw new BadRequestException('CPF Inválido');
            
            return await this.prisma.patient.create({
                data: {
                    name,
                    cpf,
                    password: hashedPassword,
                    confirmPassword: password,
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
          const updateData: any = {
            name,
            cpf,
            hospitalUnitId,
          };
      
          if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
            updateData.confirmPassword = password;
          }
      
          return await this.prisma.patient.update({
            data: updateData,
            where: { id },
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