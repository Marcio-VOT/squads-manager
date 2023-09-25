/*
  Warnings:

  - A unique constraint covering the columns `[name,team_id,process_id]` on the table `SubProcess` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SubProcess_name_team_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "SubProcess_name_team_id_process_id_key" ON "SubProcess"("name", "team_id", "process_id");
