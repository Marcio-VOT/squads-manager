import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthAdminService } from './authAdmin.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authAdminService: AuthAdminService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: AuthSignUpDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() body: AuthSignInDto) {
    return this.authService.signIn(body);
  }

  @HttpCode(200)
  @Post('signin/:admin_password')
  async signInAdmin(
    @Body() body: AuthSignInDto,
    @Param('admin_password') admin_password: string,
  ) {
    return this.authAdminService.signIn(body, admin_password);
  }

  @Post('signup/:admin_password')
  async signUpAdmin(
    @Body() body: AuthSignUpDto,
    @Param('admin_password') admin_password: string,
  ) {
    return this.authAdminService.signUp(body, admin_password);
  }
}
