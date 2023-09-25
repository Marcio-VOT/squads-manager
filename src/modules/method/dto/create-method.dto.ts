import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateMethodDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 80)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  subProcess_id: number;
}

// model Method {
//   id            Int        @id @default(autoincrement())
//   name          String     @db.VarChar(80)
//   description   String?    @db.VarChar(300)
//   createdAt     DateTime   @default(now())
//   updatedAt     DateTime   @updatedAt
//   SubProcess    SubProcess @relation(fields: [subProcess_id], references: [id])
//   subProcess_id Int
//   Stack         Stack[]
// }
