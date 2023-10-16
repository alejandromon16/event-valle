-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'CONTENT_APPROVER', 'CONTENT_PUBLISHER', 'REQUEST_APPROVER', 'CONTENT_VISULIZER', 'USER');

-- CreateEnum
CREATE TYPE "EventRequestStatus" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" "RoleType" NOT NULL DEFAULT 'USER',
    "description" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestedById" TEXT NOT NULL,
    "approvedById" TEXT NOT NULL,
    "status" "EventRequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "EventRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "principalImage" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "images" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRequest" ADD CONSTRAINT "EventRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRequest" ADD CONSTRAINT "EventRequest_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
