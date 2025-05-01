import { Injectable } from '@nestjs/common';
import db from '../db';
import { langTagTable } from '../db/schema';
import type CreateLangTagDto from './dto/create-langTag.dto';
import { eq, sql } from 'drizzle-orm';
@Injectable()
export class LangTagService {
  async create(createLangTagDto: CreateLangTagDto) {
    return await db.insert(langTagTable).values(createLangTagDto).returning();
  }

  async findAll() {
    return await db.select().from(langTagTable);
  }

  async remove(id: number) {
    return await db
      .delete(langTagTable)
      .where(eq(langTagTable.id, id))
      .returning();
  }

  async update(id: number, updateLangTagDto: CreateLangTagDto) {
    return await db
      .update(langTagTable)
      .set({
        ...updateLangTagDto,
        updatedAt: sql`NOW()`,
      })
      .where(eq(langTagTable.id, id))
      .returning();
  }
}
