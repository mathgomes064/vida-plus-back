import { Module } from '@nestjs/common';
import { HospitalUnityModule } from './components/hospitalUnity/hospitalUnity.module';

@Module({
  imports: [
    HospitalUnityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}