export class CreateStackDto {
  name: string;
  method_id: number;
}

// model Stack {
//   id        Int       @id @default(autoincrement())
//   name      String    @db.VarChar(80)
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   Method    Method[]
//   Process   Process[]
// }
