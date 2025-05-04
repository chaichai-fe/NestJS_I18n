import { Injectable } from '@nestjs/common';
import { translationTable } from '../db/schema';
import db from '../db';
import { eq } from 'drizzle-orm';
import CreateTranslationDto from './dto/create-translation.dto';
@Injectable()
export class TranslationsService {
  async create(createTranslationDto: CreateTranslationDto) {
    return await db
      .insert(translationTable)
      .values(createTranslationDto)
      .returning();
  }

  async findAll() {
    return await db.select().from(translationTable);
  }

  async remove(id: number) {
    return await db
      .delete(translationTable)
      .where(eq(translationTable.id, id))
      .returning();
  }

  async update(id: number, updateTranslationDto: CreateTranslationDto) {
    return await db
      .update(translationTable)
      .set(updateTranslationDto)
      .where(eq(translationTable.id, id))
      .returning();
  }

  async findById(id: number) {
    return await db
      .select()
      .from(translationTable)
      .where(eq(translationTable.id, id));
  }
}
