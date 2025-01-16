/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cinemaName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cinemaAddress` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "minAge" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "cinemaName" SET NOT NULL,
ALTER COLUMN "cinemaAddress" SET NOT NULL;
