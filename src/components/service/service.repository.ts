import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { IServiceRepository } from "./interfaces/service.repository.interface";
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ServiceRepository implements IServiceRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAllServices(query: any): Promise<any> {
    return this.prisma.service.findMany({
      include: {
        patient: true,
        hospitalUnit: true,
        healthProfessional: true
      }
    });
  }

  async createService(data: any, priceForService: number, supplies: number): Promise<any> {
    const { description, serviceDate, hospitalUnitId, patientId, serviceType, healthProfessionalId } = data;

    try {
      const selectedUnity = await this.prisma.hospitalUnity.findFirst({
        where: {
          id: hospitalUnitId,
        },
      });

      if (!selectedUnity) {
        throw new BadRequestException('Unidade hospitalar não encontrada');
      }

      await this.prisma.hospitalUnity.update({
        data: {
          beds: selectedUnity.beds - 1,
          financialReport: selectedUnity.financialReport + priceForService,
          supplies: selectedUnity.supplies - supplies,
        },
        where: {
          id: selectedUnity.id,
        },
      });

      return await this.prisma.service.create({
        data: {
          description,
          serviceDate,
          hospitalUnitId,
          patientId,
          serviceType,
          healthProfessionalId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }


  async updateService(id: UUID, data: any, patientId: string): Promise<any> {
    const existingService = await this.prisma.service.findUnique({
      where: { id },
      select: { patientId: true },
    });

    if (!existingService) {
      throw new BadRequestException('Serviço não encontrado.');
    }

    if (existingService.patientId !== patientId) {
      throw new BadRequestException('Você não tem permissão para editar este serviço.');
    }

    const {
      description,
      serviceDate,
      hospitalUnitId,
      isServiceCompleted,
      serviceType,
      healthProfessionalId
    } = data;

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
        where: { id },
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