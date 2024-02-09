import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateMemberDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  current_squad_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  position: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  discord: string;
}
