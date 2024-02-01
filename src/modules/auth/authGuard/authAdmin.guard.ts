import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthAdminService } from '../authAdmin.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(
    private readonly authService: AuthAdminService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const token = authorization?.split(' ')[1];
      const data = this.authService.checkToken(token);
      const user = await this.prisma.user.findFirst({
        where: { id: +data.sub },
      });

      request.user = user;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
