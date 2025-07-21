import { Injectable } from '@nestjs/common'
import db from '../db'
import { langTagTable } from '../db/schema'
import type CreateLangTagDto from './dto/create-langTag.dto'
import { eq, sql } from 'drizzle-orm'
import { PaginationDto } from './dto/pagination.dto'

@Injectable()
export class LangTagService {
  async create(createLangTagDto: CreateLangTagDto) {
    return await db.insert(langTagTable).values(createLangTagDto).returning()
  }

  async findAll(paginationDto: PaginationDto) {
    // 兜底转换为数字
    const page = Number(paginationDto.page)
    const pageSize = Number(paginationDto.pageSize)
    const offset = (page - 1) * pageSize

    const [data, total] = await Promise.all([
      db.select().from(langTagTable).limit(pageSize).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(langTagTable),
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
    return await db
      .delete(langTagTable)
      .where(eq(langTagTable.id, id))
      .returning()
  }

  async update(id: number, updateLangTagDto: CreateLangTagDto) {
    return await db
      .update(langTagTable)
      .set({
        ...updateLangTagDto,
        updatedAt: sql`NOW()`,
      })
      .where(eq(langTagTable.id, id))
      .returning()
  }

  async findById(id: number) {
    return await db.select().from(langTagTable).where(eq(langTagTable.id, id))
  }
}
