import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAreaDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;
}
