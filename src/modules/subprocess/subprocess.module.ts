import { Module } from '@nestjs/common';
import { SubprocessService } from './subprocess.service';
import { SubprocessController } from './subprocess.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaSubprocessRepository } from './repository/implementations/prismaSubprocess.repository';
import { SubprocessRepository } from './repository/subprocess.repository';
import { ProcessRepository } from '../process/repository/process.repository';
import { PrismaProcessRepository } from '../process/repository/implementations/prismaProcess.repository';

@Module({
  imports: [AuthModule],
  controllers: [SubprocessController],
  providers: [
    SubprocessService,
    { provide: SubprocessRepository, useClass: PrismaSubprocessRepository },
    { provide: ProcessRepository, useClass: PrismaProcessRepository },
  ],
  exports: [
    SubprocessService,
    { provide: SubprocessRepository, useClass: PrismaSubprocessRepository },
  ],
})
export class SubprocessModule {}
