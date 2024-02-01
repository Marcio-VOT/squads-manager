import { Module } from '@nestjs/common';
import { SquadController } from './squad.controller';
import { PrismaSquadRepository } from './repository/implementations/prismaSquad.repository';
import { SquadRepository } from './repository/squad.repository';
import { SquadService } from './squad.service';

@Module({
  controllers: [SquadController],
  providers: [
    SquadService,
    { provide: SquadRepository, useClass: PrismaSquadRepository },
  ],
})
export class ProductModule {}
