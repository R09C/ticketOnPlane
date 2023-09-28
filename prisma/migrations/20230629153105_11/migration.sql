/*
  Warnings:

  - You are about to drop the column `count` on the `Passage` table. All the data in the column will be lost.
  - Added the required column `place` to the `Plane` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passage" DROP COLUMN "count",
ADD COLUMN     "purchased" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Plane" ADD COLUMN     "place" INTEGER NOT NULL;
