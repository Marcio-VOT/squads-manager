import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
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
