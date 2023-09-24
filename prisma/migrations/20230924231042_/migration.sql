-- AlterTable
CREATE SEQUENCE subprocess_order_seq;
ALTER TABLE "SubProcess" ALTER COLUMN "order" SET DEFAULT nextval('subprocess_order_seq');
ALTER SEQUENCE subprocess_order_seq OWNED BY "SubProcess"."order";
