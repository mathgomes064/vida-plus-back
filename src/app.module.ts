import { Module } from '@nestjs/common';
import { HospitalUnityModule } from './components/hospitalUnity/hospitalUnity.module';
import { HealthProfessionalModule } from './components/healthProfessionals/healthProfessinal.module';
import { PatientModule } from './components/patient/patient.module';
import { ServiceModule } from './components/service/service.module';

@Module({
  imports: [
    HospitalUnityModule,
    HealthProfessionalModule,
    PatientModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}