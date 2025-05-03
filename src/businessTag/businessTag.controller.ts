import {
  Controller,
  Get,
  Post,
  Delete,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { BusinessTagService } from './businessTag.service';
import CreateBusinessTagDto from './dto/create-businessTag.dto';
import { Body } from '@nestjs/common';

@Controller('business_tag')
export class BusinessTagController {
  constructor(private readonly businessService: BusinessTagService) {}

  @Get()
  async findAll() {
    const result = await this.businessService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'find all success',
      result,
    };
  }

  @Post()
  async create(@Body() createBusinessTagDto: CreateBusinessTagDto) {
    const result = await this.businessService.create(createBusinessTagDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'create success',
      result,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.businessService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'delete success',
      result,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusinessTagDto: CreateBusinessTagDto,
  ) {
    const result = await this.businessService.update(+id, updateBusinessTagDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'update success',
      result,
    };
  }
}
