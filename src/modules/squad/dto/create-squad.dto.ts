import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateSquadDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  leader_id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  sprint_duration: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @Length(0, 255)
  trello_url: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  product_owner_id: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  scrum_master_id: number;
}
