import { SquadMember } from '@prisma/client';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';

export abstract class MemberRepository {
  abstract createMember(data: CreateMemberDto): Promise<SquadMember>;
  abstract findMemberById(member_id: number): Promise<SquadMember>;
  abstract findAllMember(): Promise<SquadMember[]>;
  abstract findaLLMemberByProductId(product_id: number): Promise<SquadMember[]>;
  abstract findaLLMemberBySquadId(squad_id: number): Promise<SquadMember[]>;
  abstract deleteMember(member_id: number): Promise<void>;
  abstract updateMember(
    data: UpdateMemberDto,
    member_id: number,
  ): Promise<SquadMember>;
}
