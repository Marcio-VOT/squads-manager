-- DropForeignKey
ALTER TABLE "SprintBacklog" DROP CONSTRAINT "SprintBacklog_product_item_id_fkey";

-- DropForeignKey
ALTER TABLE "SprintBacklog" DROP CONSTRAINT "SprintBacklog_sprint_id_fkey";

-- DropForeignKey
ALTER TABLE "SquadMember" DROP CONSTRAINT "SquadMember_current_squad_id_fkey";

-- DropForeignKey
ALTER TABLE "SquadMembership" DROP CONSTRAINT "SquadMembership_squad_id_fkey";

-- AlterTable
ALTER TABLE "SprintBacklog" ALTER COLUMN "sprint_id" DROP NOT NULL,
ALTER COLUMN "product_item_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SquadMembership" ALTER COLUMN "squad_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SquadMember" ADD CONSTRAINT "SquadMember_current_squad_id_fkey" FOREIGN KEY ("current_squad_id") REFERENCES "Squad"("squad_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SquadMembership" ADD CONSTRAINT "SquadMembership_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "Squad"("squad_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintBacklog" ADD CONSTRAINT "SprintBacklog_sprint_id_fkey" FOREIGN KEY ("sprint_id") REFERENCES "Sprint"("sprint_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintBacklog" ADD CONSTRAINT "SprintBacklog_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "Product"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;
