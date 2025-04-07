import { Module } from "@nestjs/common";
import { PrimsaModule } from "src/infra/database/prisma/prisma.module";
import { HospitalUnityController } from "./hospitalUnity.controller";
import { HospitalUnityService } from "./hospitalUnity.service";
import { HospitalUnityRepository } from "./hospitalUnity.repository";

@Module({
    imports: [PrimsaModule],
    controllers: [HospitalUnityController],
    providers: [
        HospitalUnityService,
        {
            provide: 'IHospitalUnityRepository',
            useClass: HospitalUnityRepository
        }
    ],
})
export class HospitalUnityModule {};