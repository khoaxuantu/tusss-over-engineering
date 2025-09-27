/*
  Warnings:

  - Added the required column `brand_id` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retailer_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."items" ADD COLUMN     "brand_id" INTEGER NOT NULL,
ADD COLUMN     "retailer_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."items_items" (
    "parent_id" INTEGER NOT NULL,
    "child_id" INTEGER NOT NULL,

    CONSTRAINT "items_items_pkey" PRIMARY KEY ("parent_id","child_id")
);

-- CreateTable
CREATE TABLE "public"."users_owning_items" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "users_owning_items_pkey" PRIMARY KEY ("user_id","item_id")
);

-- CreateTable
CREATE TABLE "public"."users_watching_items" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "users_watching_items_pkey" PRIMARY KEY ("user_id","item_id")
);

-- CreateTable
CREATE TABLE "public"."purchase_logs" (
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buyer_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "purchase_logs_pkey" PRIMARY KEY ("buyer_id","item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_owning_items_item_id_key" ON "public"."users_owning_items"("item_id");

-- CreateIndex
CREATE INDEX "items_name_idx" ON "public"."items"("name");

-- CreateIndex
CREATE INDEX "items_price_idx" ON "public"."items"("price");

-- AddForeignKey
ALTER TABLE "public"."items" ADD CONSTRAINT "items_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "public"."sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."items" ADD CONSTRAINT "items_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users_owning_items" ADD CONSTRAINT "users_owning_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users_owning_items" ADD CONSTRAINT "users_owning_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users_watching_items" ADD CONSTRAINT "users_watching_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users_watching_items" ADD CONSTRAINT "users_watching_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."purchase_logs" ADD CONSTRAINT "purchase_logs_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."purchase_logs" ADD CONSTRAINT "purchase_logs_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
