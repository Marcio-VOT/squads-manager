import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthAdminService } from '../authAdmin.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  /**
   * Constructor of AuthGuard class.
   * @param authService - Instance of AuthService.
   * @param prisma - Instance of PrismaService.
   */
  constructor(
    private readonly authService: AuthAdminService,
    private readonly prisma: PrismaService,
  ) {}
  /**
   * Method that determines if a user is authorized to access a certain route.
   * @param context - ExecutionContext object.
   * @returns A boolean indicating if the user is authorized to access the route.
   */
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
