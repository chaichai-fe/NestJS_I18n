import { Injectable } from '@nestjs/common';
import db from '../db';
import { langTagTable } from '../db/schema';
import type CreateLangTagDto from './dto/create-langTag.dto';

@Injectable()
export class LangTagService {
  create(createLangTagDto: CreateLangTagDto) {
    return db.insert(langTagTable).values(createLangTagDto);
  }

  findAll() {
    return db.select().from(langTagTable);
  }
}
