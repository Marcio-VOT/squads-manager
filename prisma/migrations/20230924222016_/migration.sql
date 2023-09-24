/*
  Warnings:

  - A unique constraint covering the columns `[name,area_id]` on the table `Process` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Process_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Process_name_area_id_key" ON "Process"("name", "area_id");
