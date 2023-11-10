-- AlterTable
ALTER TABLE "NotificationPreference" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" SET DEFAULT true,
ALTER COLUMN "whatsapp" DROP NOT NULL,
ALTER COLUMN "whatsapp" SET DEFAULT false;
