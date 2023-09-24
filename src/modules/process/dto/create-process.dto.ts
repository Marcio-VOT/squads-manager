import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProcessDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  area_id: number;
}

// model Process {
//   id         Int          @id @default(autoincrement())
//   name       String       @db.VarChar(80)
//   createdAt  DateTime     @default(now())
//   updatedAt  DateTime     @updatedAt
//   Area       Area         @relation(fields: [area_id], references: [id])
//   area_id    Int
//   SubProcess SubProcess[]
//   Stack      Stack[]
// }
