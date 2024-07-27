-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
