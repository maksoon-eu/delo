UPDATE "Order" o
SET "price" = COALESCE(items.total, 0)
FROM (
    SELECT "orderId", SUM("price") AS total
    FROM "OrderItem"
    GROUP BY "orderId"
) items
WHERE o.id = items."orderId"
  AND o."price" IS NULL;

UPDATE "Order"
SET "price" = 0
WHERE "price" IS NULL;

ALTER TABLE "Order" ALTER COLUMN "price" SET NOT NULL;
