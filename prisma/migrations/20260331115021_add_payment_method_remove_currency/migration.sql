/*
  Warnings:

  - You are about to drop the column `currency` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDetails` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'SBP', 'BANK_ACCOUNT', 'CASH');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "currency",
DROP COLUMN "paymentDetails",
ADD COLUMN     "paymentMethod" "PaymentMethod";
