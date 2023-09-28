/*
  Warnings:

  - You are about to drop the column `purchased` on the `Passage` table. All the data in the column will be lost.
  - You are about to drop the column `tiket_CategoryId` on the `Tiket` table. All the data in the column will be lost.
  - You are about to drop the column `count_tiket` on the `Tiket_Category` table. All the data in the column will be lost.
  - You are about to drop the column `planeId` on the `Tiket_Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tiket_Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Tiket_Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('EXTRA_VIP', 'VIP', 'BUSINESS', 'ECONOMY');

-- DropForeignKey
ALTER TABLE "Tiket" DROP CONSTRAINT "Tiket_tiket_CategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Tiket_Category" DROP CONSTRAINT "Tiket_Category_planeId_fkey";

-- AlterTable
ALTER TABLE "Passage" DROP COLUMN "purchased",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tiket" DROP COLUMN "tiket_CategoryId",
ADD COLUMN     "place_CategoryId" INTEGER;

-- AlterTable
ALTER TABLE "Tiket_Category" DROP COLUMN "count_tiket",
DROP COLUMN "planeId",
ADD COLUMN     "name" "Category" NOT NULL;

-- CreateTable
CREATE TABLE "Place_Category" (
    "id" SERIAL NOT NULL,
    "planeId" INTEGER,
    "place" INTEGER NOT NULL,
    "tiket_CategoryId" INTEGER,

    CONSTRAINT "Place_Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tiket_Category_name_key" ON "Tiket_Category"("name");

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_place_CategoryId_fkey" FOREIGN KEY ("place_CategoryId") REFERENCES "Place_Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place_Category" ADD CONSTRAINT "Place_Category_planeId_fkey" FOREIGN KEY ("planeId") REFERENCES "Plane"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place_Category" ADD CONSTRAINT "Place_Category_tiket_CategoryId_fkey" FOREIGN KEY ("tiket_CategoryId") REFERENCES "Tiket_Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
