import { Injectable } from '@nestjs/common'
import { translationTable } from '../db/schema'
import db from '../db'
import { eq, sql } from 'drizzle-orm'
import CreateTranslationDto from './dto/create-translation.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
@Injectable()
export class TranslationsService {
  async create(createTranslationDto: CreateTranslationDto) {
    await db.insert(translationTable).values(createTranslationDto)

    // MySQL doesn't support returning, so we need to query the inserted record
    const [insertedRecord] = await db
      .select()
      .from(translationTable)
      .where(eq(translationTable.name, createTranslationDto.name))
      .limit(1)

    return [insertedRecord]
  }

  async findAll(paginationDto: PaginationDto) {
    // 兜底转换为数字，使用默认值
    const page = Number(paginationDto.page) || 1
    const pageSize = Number(paginationDto.pageSize) || 10
    const offset = (page - 1) * pageSize

    const [data, total] = await Promise.all([
      db.select().from(translationTable).limit(pageSize).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(translationTable),
    ])

    return {
      data,
      total: total[0].count,
      page,
      pageSize,
      totalPages: Math.ceil(total[0].count / pageSize),
    }
  }

  async remove(id: number) {
    await db.delete(translationTable).where(eq(translationTable.id, id))

    return { success: true }
  }

  async update(id: number, updateTranslationDto: CreateTranslationDto) {
    await db
      .update(translationTable)
      .set(updateTranslationDto)
      .where(eq(translationTable.id, id))

    // MySQL doesn't support returning, so we need to query the updated record
    const [updatedRecord] = await db
      .select()
      .from(translationTable)
      .where(eq(translationTable.id, id))
      .limit(1)

    return [updatedRecord]
  }

  async findById(id: number) {
    return await db
      .select()
      .from(translationTable)
      .where(eq(translationTable.id, id))
  }

  async getTranslationsAsJson() {
    const translations = await db
      .select({
        translations: translationTable.translations,
      })
      .from(translationTable)
    return translations
  }
}
