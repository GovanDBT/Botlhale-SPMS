/*
  Warnings:

  - You are about to drop the column `lastUpdate` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "lastUpdate",
ADD COLUMN     "lastUpdated" TIMESTAMP(3);
