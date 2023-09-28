/*
  Warnings:

  - You are about to drop the column `count` on the `Plane` table. All the data in the column will be lost.
  - Added the required column `count_tiket` to the `Tiket_Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plane" DROP COLUMN "count";

-- AlterTable
ALTER TABLE "Tiket_Category" ADD COLUMN     "count_tiket" INTEGER NOT NULL;
