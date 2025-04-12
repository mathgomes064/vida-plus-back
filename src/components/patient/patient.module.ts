import { Module } from "@nestjs/common";
import { PrimsaModule } from "src/infra/database/prisma/prisma.module";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { PatientRepository } from "./patient.repository";

@Module({
    imports: [PrimsaModule],
    controllers: [PatientController],
    providers: [
        PatientService,
        {
            provide: 'IPatientRepository',
            useClass: PatientRepository
        }
    ],
})
export class PatientModule {};