/*
  Warnings:

  - You are about to drop the column `published` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requestEventId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestEventId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISH');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "published",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "latitud" DOUBLE PRECISION,
ADD COLUMN     "locationDetail" TEXT,
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "longitud" DOUBLE PRECISION,
ADD COLUMN     "publishedById" TEXT,
ADD COLUMN     "requestEventId" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Event_requestEventId_key" ON "Event"("requestEventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_requestEventId_fkey" FOREIGN KEY ("requestEventId") REFERENCES "RequestEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
