import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSubprocessDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 80)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  process_id: number;
}

// model SubProcess {
//   id          Int      @id @default(autoincrement())
//   name        String   @db.VarChar(80)
//   description String?
//   order       Int       @default(autoincrement())
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   Process     Process  @relation(fields: [process_id], references: [id])
//   process_id  Int
//   Method      Method[]
//   Team        Team     @relation(fields: [team_id], references: [id])
//   team_id     Int
//   @@unique([name, team_id])
//   @@unique([order, process_id, team_id])
// }
