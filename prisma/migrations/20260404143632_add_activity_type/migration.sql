-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('STATUS_CHANGE', 'NOTE', 'PAYMENT');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "type" "ActivityType" NOT NULL DEFAULT 'STATUS_CHANGE';
