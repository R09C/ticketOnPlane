/*
  Warnings:

  - You are about to drop the column `count` on the `Passage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Passage" DROP COLUMN "count",
ADD COLUMN     "planeId" INTEGER;

-- AlterTable
ALTER TABLE "Tiket" ADD COLUMN     "tiket_CategoryId" INTEGER;

-- CreateTable
CREATE TABLE "Plane" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coeff" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Plane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tiket_Category" (
    "id" SERIAL NOT NULL,
    "planeId" INTEGER NOT NULL,
    "coeff" INTEGER NOT NULL,

    CONSTRAINT "Tiket_Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Passage" ADD CONSTRAINT "Passage_planeId_fkey" FOREIGN KEY ("planeId") REFERENCES "Plane"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_tiket_CategoryId_fkey" FOREIGN KEY ("tiket_CategoryId") REFERENCES "Tiket_Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket_Category" ADD CONSTRAINT "Tiket_Category_planeId_fkey" FOREIGN KEY ("planeId") REFERENCES "Plane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
