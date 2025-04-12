-- CreateTable
CREATE TABLE "HealthProfessional" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "hospitalUnitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "professionalType" "ProfessionalType" NOT NULL,

    CONSTRAINT "HealthProfessional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthProfessional_cpf_key" ON "HealthProfessional"("cpf");

-- AddForeignKey
ALTER TABLE "HealthProfessional" ADD CONSTRAINT "HealthProfessional_hospitalUnitId_fkey" FOREIGN KEY ("hospitalUnitId") REFERENCES "HospitalUnity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
