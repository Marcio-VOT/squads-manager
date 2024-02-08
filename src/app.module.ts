import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { SquadModule } from './modules/squad/todo.module';
// import { UserModule } from './modules/user/user.module';
// import { AreaModule } from './modules/area/area.module';
// import { MethodModule } from './modules/method/method.module';
// import { ProcessModule } from './modules/process/process.module';
// import { SubprocessModule } from './modules/subprocess/subprocess.module';
// import { TeamModule } from './modules/team/team.module';
// import { AuthModule } from './modules/auth/auth.module';
// import { StackModule } from './modules/stack/stack.module';

@Module({
  imports: [PrismaModule, SquadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
