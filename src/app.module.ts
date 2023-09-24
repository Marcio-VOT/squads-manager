import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AreaModule } from './modules/area/area.module';
import { MethodModule } from './modules/method/method.module';
import { ProcessModule } from './modules/process/process.module';
import { SubprocessModule } from './modules/subprocess/subprocess.module';
import { TeamModule } from './modules/team/team.module';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AreaModule,
    MethodModule,
    ProcessModule,
    SubprocessModule,
    TeamModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
