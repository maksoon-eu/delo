-- Add new enum values
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'DRAFT';
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'SENT';
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'CONFIRMED';
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'IN_PROGRESS';
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'COMPLETED';
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'CANCELLED';

-- Migrate existing STATUS_CHANGE records to NOTE
UPDATE "Activity" SET "type" = 'NOTE' WHERE "type" = 'STATUS_CHANGE';

-- Drop column default before type recreation
ALTER TABLE "Activity" ALTER COLUMN "type" DROP DEFAULT;

-- Recreate enum without STATUS_CHANGE
CREATE TYPE "ActivityType_new" AS ENUM ('DRAFT', 'SENT', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NOTE', 'PAYMENT');

ALTER TABLE "Activity"
  ALTER COLUMN "type" TYPE "ActivityType_new"
  USING "type"::text::"ActivityType_new";

DROP TYPE "ActivityType";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
