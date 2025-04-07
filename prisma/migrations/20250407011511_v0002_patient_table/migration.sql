/*
  Warnings:

  - Changed the type of `financialReport` on the `HospitalUnity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `supplies` on the `HospitalUnity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HospitalUnity" DROP COLUMN "financialReport",
ADD COLUMN     "financialReport" INTEGER NOT NULL,
DROP COLUMN "supplies",
ADD COLUMN     "supplies" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hospitalUnitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cpf_key" ON "Patient"("cpf");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_hospitalUnitId_fkey" FOREIGN KEY ("hospitalUnitId") REFERENCES "HospitalUnity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
