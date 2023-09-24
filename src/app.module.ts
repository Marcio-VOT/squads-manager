import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AreaModule } from './modules/area/area.module';
import { MethodModule } from './modules/method/method.module';
import { ProcessModule } from './modules/process/process.module';
import { SubprocessModule } from './modules/subprocess/subprocess.module';

@Module({
  imports: [
    UserModule,
    AreaModule,
    MethodModule,
    ProcessModule,
    SubprocessModule,
  ],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
