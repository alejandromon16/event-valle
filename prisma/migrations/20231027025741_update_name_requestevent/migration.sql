/*
  Warnings:

  - You are about to drop the `EventRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestEventStatus" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- DropForeignKey
ALTER TABLE "EventRequest" DROP CONSTRAINT "EventRequest_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "EventRequest" DROP CONSTRAINT "EventRequest_requestedById_fkey";

-- DropTable
DROP TABLE "EventRequest";

-- DropEnum
DROP TYPE "EventRequestStatus";

-- CreateTable
CREATE TABLE "RequestEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestedById" TEXT NOT NULL,
    "approvedById" TEXT NOT NULL,
    "status" "RequestEventStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "RequestEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestEvent" ADD CONSTRAINT "RequestEvent_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestEvent" ADD CONSTRAINT "RequestEvent_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
