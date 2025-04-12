import { Module } from "@nestjs/common";
import { PrimsaModule } from "src/infra/database/prisma/prisma.module";
import { HealthProfessionalController } from "./healthProfessinal.controller";
import { HealthProfessionalService } from "./healthProfessinal.service";
import { HealthProfessionalRepository } from "./healthProfessinal.repository";

@Module({
    imports: [PrimsaModule],
    controllers: [HealthProfessionalController],
    providers: [
        HealthProfessionalService,
        {
            provide: 'IHealthProfessionalRepository',
            useClass: HealthProfessionalRepository
        }
    ],
})
export class HealthProfessionalModule {};