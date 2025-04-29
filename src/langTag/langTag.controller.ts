import { Controller, Get } from '@nestjs/common';
import { LangTagService } from './langTag.service';

@Controller('lang_tag')
export class LangTagController {
  constructor(private readonly langTagService: LangTagService) {}

  @Get()
  findAll() {
    return this.langTagService.findAll();
  }
}
