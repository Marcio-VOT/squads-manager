import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() body: AuthSignUpDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() body: AuthSignInDto) {
    return this.authService.signIn(body);
  }
}
