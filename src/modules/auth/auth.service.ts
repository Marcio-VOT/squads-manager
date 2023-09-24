import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserRepository,
  ReturnCreateUser,
} from '../user/repository/user.repository';
import { UserService } from '../user/user.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private AUDIENCE = 'user';
  private ISSUER = 'stage-case';

  /**
   * Creates an instance of AuthService.
   * @param {UserService} usersService - The user service.
   * @param {UserRepository} usersRepository - The user repository.
   * @param {JwtService} jwtService - The JWT service.
   */
  constructor(
    private readonly usersService: UserService,
    private readonly usersRepository: UserRepository,
    /* eslint-disable */
    private readonly jwtService: JwtService,
  ) { }

  /* eslint-enable */

  /**
   * Creates a new user and returns a JWT token.
   * @param {AuthSignUpDto} body - The sign up data.
   * @returns {Promise<{ token: string }>} The JWT token.
   */
  async signUp(body: AuthSignUpDto): Promise<{ token: string }> {
    const user = await this.usersService.create(body);
    return this.createToken(user);
  }

  /**
   * Authenticates a user and returns a JWT token.
   * @param {AuthSignInDto} body - The sign in data.
   * @returns {Promise<{ token: string }>} The JWT token.
   * @throws {UnauthorizedException} If the CPF or password are incorrect.
   */
  async signIn({ cpf, password }: AuthSignInDto): Promise<{ token: string }> {
    const user = await this.usersRepository.findUserByCPF(cpf);
    if (!user) throw new UnauthorizedException('CPF or password are incorrect');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('CPF or password are incorrect');

    return this.createToken(user);
  }

  /**
   * Creates a JWT token for the given user.
   * @param {ReturnCreateUser} user - The user data.
   * @returns {{ token: string }} The JWT token.
   */
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

  /**
   * Verifies the given JWT token and returns its payload.
   * @param {string} token - The JWT token.
   * @returns {*} The token payload.
   * @throws {BadGatewayException} If the token is invalid.
   */
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
