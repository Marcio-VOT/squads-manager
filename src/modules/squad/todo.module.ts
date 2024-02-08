import { Module } from '@nestjs/common';
import { PrismaSquadRepository } from './repository/implementations/prismaSquad.repository';
import { SquadRepository } from './repository/squad.repository';
import { SquadController } from './todo.controller';
import { SquadService } from './squad.service';

@Module({
  controllers: [SquadController],
  providers: [
    SquadService,
    { provide: SquadRepository, useClass: PrismaSquadRepository },
  ],
})
export class SquadModule {}
