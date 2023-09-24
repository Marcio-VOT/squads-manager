import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private AUDIENCE = 'users';
  private ISSUER = 'social-postify';

  /* eslint-disable prettier/prettier */
  constructor(
    private readonly usersService: UserService,
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }
  /* eslint-enable prettier/prettier */

  async signUp(body: AuthSignUpDto) {
    const user = await this.usersService.create(body);
    return this.createToken(user);
  }

  async signIn({ cpf, password }: AuthSignInDto) {
    const user = await this.usersRepository.findUserByCPF(cpf);
    if (!user) throw new UnauthorizedException('CPF or password are incorrect');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('CPF or password are incorrect');

    return this.createToken(user);
  }

  createToken(user: ReturnCreateUser) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        cpf: user.cpf,
        avatar: user.avatar,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return { token };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadGatewayException(error);
    }
  }
}
