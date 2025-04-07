-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('CONSULTATIONS', 'EXAMS', 'MEDICAL_RECORDS', 'TELEMEDICINE');

-- CreateEnum
CREATE TYPE "ProfessionalType" AS ENUM ('DOCTORS', 'NURSES', 'TECHNICIANS', 'DIARIES', 'PRESCRIPTIONS');

-- CreateTable
CREATE TABLE "HospitalUnity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "beds" INTEGER NOT NULL,
    "financialReport" TEXT NOT NULL,
    "supplies" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HospitalUnity_pkey" PRIMARY KEY ("id")
);
