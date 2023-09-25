import { Module } from '@nestjs/common';
import { MethodService } from './method.service';
import { MethodController } from './method.controller';
import { PrismaMethodRepository } from './repository/implementations/prismaMethod.repository';
import { MethodRepository } from './repository/method.repository';
import { AuthModule } from '../auth/auth.module';
import { SubprocessService } from '../subprocess/subprocess.service';
import { PrismaSubprocessRepository } from '../subprocess/repository/implementations/prismaSubprocess.repository';
import { SubprocessRepository } from '../subprocess/repository/subprocess.repository';
import { ProcessRepository } from '../process/repository/process.repository';
import { ProcessService } from '../process/process.service';
import { PrismaProcessRepository } from '../process/repository/implementations/prismaProcess.repository';
import { AreaService } from '../area/area.service';
import { AreaRepository } from '../area/repository/area.repository';
import { PrismaAreaRepository } from '../area/repository/implementations/prismaArea.repository';

@Module({
  imports: [AuthModule],
  controllers: [MethodController],
  providers: [
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
    MethodService,
    { provide: MethodRepository, useClass: PrismaMethodRepository },
  ],
})
export class MethodModule {}
