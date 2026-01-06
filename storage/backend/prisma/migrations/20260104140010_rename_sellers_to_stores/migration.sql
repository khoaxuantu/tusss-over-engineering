/*
  Warnings:

  - You are about to drop the `sellers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sellers_locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StoreType" AS ENUM ('AUTH', 'RETAIL');

-- DropForeignKey
ALTER TABLE "public"."items" DROP CONSTRAINT "items_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."items" DROP CONSTRAINT "items_retailer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sellers_locations" DROP CONSTRAINT "sellers_locations_city_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sellers_locations" DROP CONSTRAINT "sellers_locations_district_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sellers_locations" DROP CONSTRAINT "sellers_locations_seller_id_fkey";

-- DropTable
DROP TABLE "public"."sellers";

-- DropTable
DROP TABLE "public"."sellers_locations";

-- DropEnum
DROP TYPE "public"."SellerType";

-- CreateTable
CREATE TABLE "stores" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "StoreType" NOT NULL,
    "href" TEXT,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores_locations" (
    "store_id" INTEGER NOT NULL,
    "city_id" VARCHAR(32) NOT NULL,
    "district_id" VARCHAR(32) NOT NULL,

    CONSTRAINT "stores_locations_pkey" PRIMARY KEY ("store_id","city_id","district_id")
);

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores_locations" ADD CONSTRAINT "stores_locations_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores_locations" ADD CONSTRAINT "stores_locations_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores_locations" ADD CONSTRAINT "stores_locations_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
