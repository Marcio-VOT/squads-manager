import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { PrismaProcessRepository } from './repository/implementations/prismaProcess.repository';
import { AuthModule } from '../auth/auth.module';
import { ProcessRepository } from './repository/process.repository';

@Module({
  imports: [AuthModule],
  controllers: [ProcessController],
  providers: [
    ProcessService,
    { provide: ProcessRepository, useClass: PrismaProcessRepository },
  ],
})
export class ProcessModule {}
