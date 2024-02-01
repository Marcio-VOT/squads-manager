import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserRepository,
  ReturnCreateUser,
} from '../product/repository/product.repository';
import { UserService } from '../product/product.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthAdminService {
  private AUDIENCE = 'admin';
  private ISSUER = 'stage-case';

  constructor(
    private readonly usersService: UserService,
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    body: AuthSignUpDto,
    admin_password: string,
  ): Promise<{ token: string }> {
    if (admin_password !== process.env.ADMIN_PASSWORD)
      throw new UnauthorizedException('Admin password is incorrect');
    const user = await this.usersService.create(body);
    return this.createToken(user);
  }

  async signIn(
    { cpf, password }: AuthSignInDto,
    admin_password: string,
  ): Promise<{ token: string }> {
    if (admin_password !== process.env.ADMIN_PASSWORD)
      throw new UnauthorizedException('Admin password is incorrect');
    const user = await this.usersRepository.findUserByCPF(cpf);
    if (!user) throw new UnauthorizedException('CPF or password are incorrect');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('CPF or password are incorrect');

    return this.createToken(user);
  }

  createToken(user: ReturnCreateUser): { token: string } {
    const token = this.jwtService.sign(
      {
        name: user.name,
        cpf: user.cpf,
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

  checkToken(token: string): any {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
