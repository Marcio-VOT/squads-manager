import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { PrismaMemberRepository } from './repository/implementations/prismaMember.repository';
import { MemberRepository } from './repository/member.repository';
import { MemberService } from './member.service';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    { provide: MemberRepository, useClass: PrismaMemberRepository },
  ],
})
export class MemberModule {}
