import { OmitType } from '@nestjs/mapped-types'
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto'

// eslint-disable-next-line prettier/prettier
export class AuthSignInDto extends OmitType(CreateUserDto, ['name', 'team'] as const) { }
