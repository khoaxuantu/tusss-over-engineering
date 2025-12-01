-- CreateEnum
CREATE TYPE "public"."SellerType" AS ENUM ('AUTH', 'RETAIL');

-- CreateTable
CREATE TABLE "public"."sellers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "public"."SellerType" NOT NULL,
    "location" TEXT,
    "href" TEXT,

    CONSTRAINT "sellers_pkey" PRIMARY KEY ("id")
);
