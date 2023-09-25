/*
  Warnings:

  - A unique constraint covering the columns `[name,subProcess_id]` on the table `Method` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Method_name_subProcess_id_key" ON "Method"("name", "subProcess_id");
