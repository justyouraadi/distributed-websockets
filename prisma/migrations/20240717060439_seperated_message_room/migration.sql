/*
  Warnings:

  - You are about to drop the column `buyer_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `members` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "buyer_id",
DROP COLUMN "members",
DROP COLUMN "seller_id";

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "room_id" TEXT NOT NULL,
    "buyer_id" INTEGER NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "members" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_room_id_key" ON "Room"("room_id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;
