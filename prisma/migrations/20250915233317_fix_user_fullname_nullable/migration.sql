/*
  Warnings:

  - You are about to drop the column `agentId` on the `Report` table. All the data in the column will be lost.
  - Changed the type of `chantierId` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `latitude` on table `Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "agentId",
DROP COLUMN "chantierId",
ADD COLUMN     "chantierId" INTEGER NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."TenantRequest" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "updatedAt" DROP DEFAULT;
