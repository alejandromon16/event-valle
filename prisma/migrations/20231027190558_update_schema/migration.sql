-- DropForeignKey
ALTER TABLE "RequestEvent" DROP CONSTRAINT "RequestEvent_approvedById_fkey";

-- AlterTable
ALTER TABLE "RequestEvent" ALTER COLUMN "approvedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RequestEvent" ADD CONSTRAINT "RequestEvent_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
