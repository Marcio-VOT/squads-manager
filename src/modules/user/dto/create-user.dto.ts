import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 120)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'password too weak',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11)
  cpf: string;

  @IsNotEmpty()
  @IsInt()
  team_id: number;
}
