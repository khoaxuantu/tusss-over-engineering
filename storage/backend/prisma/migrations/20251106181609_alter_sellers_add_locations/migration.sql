/*
  Warnings:

  - You are about to drop the column `location` on the `sellers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."sellers" DROP COLUMN "location";

-- CreateTable
CREATE TABLE "public"."cities" (
    "id" VARCHAR(32) NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."districts" (
    "id" VARCHAR(32) NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."seller_locations" (
    "seller_id" INTEGER NOT NULL,
    "city_id" VARCHAR(32) NOT NULL,
    "district_id" VARCHAR(32) NOT NULL,

    CONSTRAINT "seller_locations_pkey" PRIMARY KEY ("seller_id","city_id","district_id")
);

-- CreateTable
CREATE TABLE "public"."tags" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "description" TEXT,
    "color" VARCHAR(7),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."seller_locations" ADD CONSTRAINT "seller_locations_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."seller_locations" ADD CONSTRAINT "seller_locations_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."seller_locations" ADD CONSTRAINT "seller_locations_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
