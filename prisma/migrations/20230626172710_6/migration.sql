/*
  Warnings:

  - Made the column `passageId` on table `Tiket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tiket" DROP CONSTRAINT "Tiket_passageId_fkey";

-- AlterTable
ALTER TABLE "Tiket" ALTER COLUMN "passageId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "Passage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
