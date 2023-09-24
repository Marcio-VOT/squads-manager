import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {}

// model Area {
//   id        Int       @id @default(autoincrement())
//   name      String    @db.VarChar(80)
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   Process   Process[]
// }
