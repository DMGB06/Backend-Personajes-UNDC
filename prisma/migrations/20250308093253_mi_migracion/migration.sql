/*
  Warnings:

  - Added the required column `especie` to the `Personaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Personaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Personaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origen` to the `Personaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Personaje` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personaje" ADD COLUMN     "especie" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "genero" TEXT NOT NULL,
ADD COLUMN     "origen" TEXT NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL;
