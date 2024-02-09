import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateSprintDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  squad_id: number;

  @IsNotEmpty()
  @IsDateString({ strict: true })
  start_date: Date;

  @IsOptional()
  @IsDateString({ strict: true })
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  sprint_goal: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  status: string;
}
