-- CreateTable
CREATE TABLE "_UserlikedEvents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserSavedEvents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserlikedEvents_AB_unique" ON "_UserlikedEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_UserlikedEvents_B_index" ON "_UserlikedEvents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSavedEvents_AB_unique" ON "_UserSavedEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSavedEvents_B_index" ON "_UserSavedEvents"("B");

-- AddForeignKey
ALTER TABLE "_UserlikedEvents" ADD CONSTRAINT "_UserlikedEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserlikedEvents" ADD CONSTRAINT "_UserlikedEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSavedEvents" ADD CONSTRAINT "_UserSavedEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSavedEvents" ADD CONSTRAINT "_UserSavedEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
