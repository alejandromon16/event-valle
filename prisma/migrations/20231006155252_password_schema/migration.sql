-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "deactivated" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
