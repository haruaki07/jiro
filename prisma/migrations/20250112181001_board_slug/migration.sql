/*
  Warnings:

  - Added the required column `slug` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Board_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Board" ("authorId", "createdAt", "desc", "id", "name", "updatedAt") SELECT "authorId", "createdAt", "desc", "id", "name", "updatedAt" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
CREATE UNIQUE INDEX "Board_slug_key" ON "Board"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
