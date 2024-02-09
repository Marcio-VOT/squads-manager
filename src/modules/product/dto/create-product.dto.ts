import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  Max,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Max(100)
  priority: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  item_description: string;
}
