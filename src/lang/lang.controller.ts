import { Controller, Get } from '@nestjs/common';

@Controller('lang')
export class LangController {
  @Get()
  findAll(): string {
    return 'This action returns all lang';
  }
}
