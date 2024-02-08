import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSquadDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  description: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;
}
