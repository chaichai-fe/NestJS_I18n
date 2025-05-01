import {
  Controller,
  Get,
  Post,
  Delete,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TranslationsService } from './translations.service';
import CreateTranslationDto from './dto/create-translation.dto';
import { Body } from '@nestjs/common';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get()
  async findAll() {
    const result = await this.translationsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'find all success',
      result,
    };
  }

  @Post()
  async create(@Body() createTranslationDto: CreateTranslationDto) {
    const result = await this.translationsService.create(createTranslationDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'create success',
      result,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.translationsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'delete success',
      result,
    };
  }
}
