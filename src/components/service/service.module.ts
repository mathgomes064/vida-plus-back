import { Module } from "@nestjs/common";
import { PrimsaModule } from "src/infra/database/prisma/prisma.module";
import { ServiceController } from "./service.controller";
import { ServiceService } from "./service.service";
import { ServiceRepository } from "./service.repository";

@Module({
    imports: [PrimsaModule],
    controllers: [ServiceController],
    providers: [
        ServiceService,
        {
            provide: 'IServiceRepository',
            useClass: ServiceRepository
        }
    ],
})
export class ServiceModule {};