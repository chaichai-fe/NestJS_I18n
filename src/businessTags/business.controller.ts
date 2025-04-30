import {
  Controller,
  Get,
  Post,
  Delete,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { BusinessTagService } from './business.service';
import CreateBusinessTagDto from './dto/create-business.dto';
import { Body } from '@nestjs/common';

@Controller('business_tag')
export class BusinessController {
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
}
