import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.findOne(id);
  }

  @Get('product/:id')
  findaLLMemberByProductId(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.findaLLMemberByProductId(id);
  }

  @Get('squad/:id')
  findaLLMemberBySquadId(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.findaLLMemberBySquadId(id);
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }
  //rever

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.remove(id);
  }
}
