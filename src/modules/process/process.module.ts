import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { PrismaProcessRepository } from './repository/implementations/prismaProcess.repository';
import { AuthModule } from '../auth/auth.module';
import { ProcessRepository } from './repository/process.repository';
import { AreaService } from '../area/area.service';
import { AreaRepository } from '../area/repository/area.repository';
import { PrismaAreaRepository } from '../area/repository/implementations/prismaArea.repository';

@Module({
  imports: [AuthModule],
  controllers: [ProcessController],
  providers: [
    ProcessService,
    { provide: ProcessRepository, useClass: PrismaProcessRepository },
    AreaService,
    { provide: AreaRepository, useClass: PrismaAreaRepository },
  ],
  exports: [
    ProcessService,
    { provide: ProcessRepository, useClass: PrismaProcessRepository },
  ],
})
export class ProcessModule {}
