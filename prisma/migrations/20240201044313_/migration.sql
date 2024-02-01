/*
  Warnings:

  - You are about to drop the column `product_backlog_item_id` on the `SprintBacklog` table. All the data in the column will be lost.
  - You are about to drop the column `burndown_chart_url` on the `Squad` table. All the data in the column will be lost.
  - You are about to drop the column `velocity` on the `Squad` table. All the data in the column will be lost.
  - Added the required column `product_item_id` to the `SprintBacklog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trello_url` to the `Squad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Squad" DROP CONSTRAINT "Squad_product_id_fkey";

-- AlterTable
ALTER TABLE "SprintBacklog" DROP COLUMN "product_backlog_item_id",
ADD COLUMN     "product_item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Squad" DROP COLUMN "burndown_chart_url",
DROP COLUMN "velocity",
ADD COLUMN     "trello_url" VARCHAR(255) NOT NULL,
ALTER COLUMN "leader_id" DROP NOT NULL,
ALTER COLUMN "product_owner_id" DROP NOT NULL,
ALTER COLUMN "scrum_master_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SquadMember" ALTER COLUMN "discord" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Squad" ADD CONSTRAINT "Squad_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintBacklog" ADD CONSTRAINT "SprintBacklog_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
