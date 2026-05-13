-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "sentAt" TIMESTAMP(3);

-- RenameColumn
ALTER TABLE "Client" RENAME COLUMN "email" TO "contact";

-- BackfillContact
UPDATE "Client"
SET "contact" = CASE
  WHEN "contact" IS NOT NULL AND "contact" <> '' AND "phone" IS NOT NULL AND "phone" <> ''
    THEN "contact" || ' / ' || "phone"
  WHEN ("contact" IS NULL OR "contact" = '') AND "phone" IS NOT NULL AND "phone" <> ''
    THEN "phone"
  ELSE "contact"
END;

-- DropColumn
ALTER TABLE "Client" DROP COLUMN "phone";
