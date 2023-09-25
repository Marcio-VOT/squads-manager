import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateStackDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  method_id: number;

  @IsNotEmpty()
  @IsNumber()
  process_id: number;
}

// model Stack {
//   id        Int       @id @default(autoincrement())
//   name      String    @db.VarChar(80)
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   Method    Method[]
//   Process   Process[]
// }
