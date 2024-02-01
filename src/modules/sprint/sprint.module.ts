import { Module } from '@nestjs/common';
import { PrismaSprintRepository } from './repository/implementations/prismaSprint.repository';
import { SprintRepository } from './repository/sprint.repository';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';

@Module({
  controllers: [SprintController],
  providers: [
    SprintService,
    { provide: SprintRepository, useClass: PrismaSprintRepository },
  ],
})
export class SprintModule {}
