/*
  Warnings:

  - The values [EXTRA_LARGE] on the enum `ProductSizes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductSizes_new" AS ENUM ('SMALL', 'MEDUIM', 'LARGE');
ALTER TABLE "Size" ALTER COLUMN "name" TYPE "ProductSizes_new" USING ("name"::text::"ProductSizes_new");
ALTER TYPE "ProductSizes" RENAME TO "ProductSizes_old";
ALTER TYPE "ProductSizes_new" RENAME TO "ProductSizes";
DROP TYPE "ProductSizes_old";
COMMIT;
