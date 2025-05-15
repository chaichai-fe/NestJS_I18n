import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Delete,
  Param,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common'
import { LangTagService } from './langTag.service'
import CreateLangTagDto from './dto/create-langTag.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { PaginationDto } from './dto/pagination.dto'

@Controller('lang_tag')
export class LangTagController {
  constructor(private readonly langTagService: LangTagService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const result = await this.langTagService.findAll(paginationDto)
    return {
      statusCode: HttpStatus.OK,
      message: 'find all success',
      result,
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createLangTagDto: CreateLangTagDto) {
    const result = await this.langTagService.create(createLangTagDto)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'create success',
      result,
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.langTagService.remove(+id)
    return {
      statusCode: HttpStatus.OK,
      message: 'delete success',
      result,
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLangTagDto: CreateLangTagDto,
  ) {
    const result = await this.langTagService.update(+id, updateLangTagDto)
    return {
      statusCode: HttpStatus.OK,
      message: 'update success',
      result,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.langTagService.findById(+id)
    return {
      statusCode: HttpStatus.OK,
      message: 'find by id success',
      result,
    }
  }
}
