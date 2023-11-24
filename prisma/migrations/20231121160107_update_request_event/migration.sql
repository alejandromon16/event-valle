/*
  Warnings:

  - Added the required column `address` to the `RequestEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `RequestEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `RequestEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `RequestEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `RequestEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RequestEvent" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "locationDetail" TEXT,
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL;
