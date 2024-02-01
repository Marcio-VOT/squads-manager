/*
  Warnings:

  - A unique constraint covering the columns `[leader_id]` on the table `Squad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_owner_id]` on the table `Squad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scrum_master_id]` on the table `Squad` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Squad_leader_id_key" ON "Squad"("leader_id");

-- CreateIndex
CREATE UNIQUE INDEX "Squad_product_owner_id_key" ON "Squad"("product_owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Squad_scrum_master_id_key" ON "Squad"("scrum_master_id");

-- AddForeignKey
ALTER TABLE "Squad" ADD CONSTRAINT "Squad_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "SquadMember"("member_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Squad" ADD CONSTRAINT "Squad_product_owner_id_fkey" FOREIGN KEY ("product_owner_id") REFERENCES "SquadMember"("member_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Squad" ADD CONSTRAINT "Squad_scrum_master_id_fkey" FOREIGN KEY ("scrum_master_id") REFERENCES "SquadMember"("member_id") ON DELETE SET NULL ON UPDATE CASCADE;
