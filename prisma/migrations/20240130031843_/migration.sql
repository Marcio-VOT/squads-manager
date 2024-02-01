-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ENDED', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "priority" INTEGER NOT NULL,
    "item_description" VARCHAR(255) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Squad" (
    "squad_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "leader_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "velocity" INTEGER NOT NULL,
    "sprint_duration" INTEGER NOT NULL,
    "burndown_chart_url" VARCHAR(255) NOT NULL,
    "product_owner_id" INTEGER NOT NULL,
    "scrum_master_id" INTEGER NOT NULL,

    CONSTRAINT "Squad_pkey" PRIMARY KEY ("squad_id")
);

-- CreateTable
CREATE TABLE "SquadMember" (
    "member_id" SERIAL NOT NULL,
    "current_squad_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "discord" VARCHAR(60) NOT NULL,

    CONSTRAINT "SquadMember_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "SquadMembership" (
    "membership_id" SERIAL NOT NULL,
    "squad_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "SquadMembership_pkey" PRIMARY KEY ("membership_id")
);

-- CreateTable
CREATE TABLE "Sprint" (
    "sprint_id" SERIAL NOT NULL,
    "squad_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "sprint_goal" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("sprint_id")
);

-- CreateTable
CREATE TABLE "SprintBacklog" (
    "sprint_backlog_id" SERIAL NOT NULL,
    "sprint_id" INTEGER NOT NULL,
    "product_backlog_item_id" INTEGER NOT NULL,
    "task_description" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "SprintBacklog_pkey" PRIMARY KEY ("sprint_backlog_id")
);

-- AddForeignKey
ALTER TABLE "Squad" ADD CONSTRAINT "Squad_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SquadMember" ADD CONSTRAINT "SquadMember_current_squad_id_fkey" FOREIGN KEY ("current_squad_id") REFERENCES "Squad"("squad_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SquadMembership" ADD CONSTRAINT "SquadMembership_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "Squad"("squad_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SquadMembership" ADD CONSTRAINT "SquadMembership_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "SquadMember"("member_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "Squad"("squad_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintBacklog" ADD CONSTRAINT "SprintBacklog_sprint_id_fkey" FOREIGN KEY ("sprint_id") REFERENCES "Sprint"("sprint_id") ON DELETE CASCADE ON UPDATE CASCADE;
