import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { AuthModule } from '../auth/auth.module';
import { AreaRepository } from './repository/area.repository';
import { PrismaAreaRepository } from './repository/implementations/prismaArea.repository';

@Module({
  imports: [AuthModule],
  controllers: [AreaController],
  providers: [
    AreaService,
    { provide: AreaRepository, useClass: PrismaAreaRepository },
  ],
})
export class AreaModule {}
