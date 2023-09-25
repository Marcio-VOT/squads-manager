import { Module } from '@nestjs/common';
import { StackService } from './stack.service';
import { StackController } from './stack.controller';
import { PrismaStackRepository } from './repository/implementations/prismaStack.repository';
import { StackRepository } from './repository/stack.repository';
import { AuthModule } from '../auth/auth.module';
import { AreaService } from '../area/area.service';
import { AreaRepository } from '../area/repository/area.repository';
import { PrismaAreaRepository } from '../area/repository/implementations/prismaArea.repository';
import { MethodService } from '../method/method.service';
import { PrismaMethodRepository } from '../method/repository/implementations/prismaMethod.repository';
import { MethodRepository } from '../method/repository/method.repository';
import { ProcessService } from '../process/process.service';
import { PrismaProcessRepository } from '../process/repository/implementations/prismaProcess.repository';
import { ProcessRepository } from '../process/repository/process.repository';
import { PrismaSubprocessRepository } from '../subprocess/repository/implementations/prismaSubprocess.repository';
import { SubprocessRepository } from '../subprocess/repository/subprocess.repository';
import { SubprocessService } from '../subprocess/subprocess.service';

@Module({
  imports: [AuthModule],
  controllers: [StackController],
  providers: [
    StackService,
    { provide: StackRepository, useClass: PrismaStackRepository },
    MethodService,
    { provide: MethodRepository, useClass: PrismaMethodRepository },
    SubprocessService,
    { provide: SubprocessRepository, useClass: PrismaSubprocessRepository },
    ProcessService,
    { provide: ProcessRepository, useClass: PrismaProcessRepository },
    AreaService,
    { provide: AreaRepository, useClass: PrismaAreaRepository },
  ],
  exports: [
    StackService,
    { provide: StackRepository, useClass: PrismaStackRepository },
  ],
})
export class StackModule {}
