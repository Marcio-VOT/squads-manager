import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import {
  IsNotEmpty,
  IsString,
  Length,
  IsStrongPassword,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  IsEmail,
  IsNumberString,
} from 'class-validator'

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'name',
]) {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsXor('cpf', 'email', {
    message: 'Either email or cpf is required, but not both',
  })
  email?: string

  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11)
  @IsXor('email', 'cpf', {
    message: 'Either email or cpf is required, but not both',
  })
  cpf?: string

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
  password: string
}

function IsXor(
  field1: string,
  field2: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isXor',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const fieldValue1 = (args.object as any)[field1]
          const fieldValue2 = (args.object as any)[field2]
          return (
            (fieldValue1 !== undefined && fieldValue2 === undefined) ||
            (fieldValue1 === undefined && fieldValue2 !== undefined)
          )
        },
      },
    })
  }
}
