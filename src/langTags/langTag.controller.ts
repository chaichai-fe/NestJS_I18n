import { Controller, Get, Post, Body } from '@nestjs/common';
import { LangTagService } from './langTag.service';
import CreateLangTagDto from './dto/create-langTag.dto';
import { ValidationPipe } from '../validation';
@Controller('lang_tag')
export class LangTagController {
  constructor(private readonly langTagService: LangTagService) {}

  @Get()
  findAll() {
    return this.langTagService.findAll();
  }

  @Post()
  async create(@Body(new ValidationPipe()) createLangTagDto: CreateLangTagDto) {
    return this.langTagService.create(createLangTagDto);
  }
}
