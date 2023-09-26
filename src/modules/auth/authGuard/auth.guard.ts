import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor of AuthGuard class.
   * @param authService - Instance of AuthService.
   * @param prisma - Instance of PrismaService.
   */
  constructor(
    private readonly authService: AuthService,
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
        include: {
          team: {
            select: {
              name: true,
            },
          },
        },
      });

      request.user = user;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
