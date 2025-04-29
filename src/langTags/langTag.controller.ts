import { Controller, Get, Post, Body } from '@nestjs/common';
import { LangTagService } from './langTag.service';
import CreateLangTagDto from './dto/create-langTag.dto';
@Controller('lang_tag')
export class LangTagController {
  constructor(private readonly langTagService: LangTagService) {}

  @Get()
  findAll() {
    return this.langTagService.findAll();
  }

  @Post()
  create(@Body() createLangTagDto: CreateLangTagDto) {
    return this.langTagService.create(createLangTagDto);
  }
}
