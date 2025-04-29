import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
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
  async create(@Body() createLangTagDto: CreateLangTagDto) {
    try {
      const result = await this.langTagService.create(createLangTagDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'create success',
        result,
      };
    } catch (error: unknown) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'create failed',
        error,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.langTagService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'delete success',
        result,
      };
    } catch (error: unknown) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'delete failed',
        error,
      };
    }
  }
}
