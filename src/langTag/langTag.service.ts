import { Injectable } from '@nestjs/common';
import db from '../db';
import { langTagTable } from '../db/schema';

@Injectable()
export class LangTagService {
  create() {}

  findAll() {
    return db.select().from(langTagTable);
  }
}
