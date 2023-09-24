/*
  Warnings:

  - A unique constraint covering the columns `[order,process_id,team_id]` on the table `SubProcess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SubProcess_order_process_id_team_id_key" ON "SubProcess"("order", "process_id", "team_id");
