import { Injectable } from '@nestjs/common'
import db from '../db'
import { langTagTable } from '../db/schema'
import type CreateLangTagDto from './dto/create-langTag.dto'
import { eq, sql } from 'drizzle-orm'
import { PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class LangTagService {
  async create(createLangTagDto: CreateLangTagDto) {
    await db.insert(langTagTable).values(createLangTagDto)

    // MySQL doesn't support returning, so we need to query the inserted record
    const [insertedRecord] = await db
      .select()
      .from(langTagTable)
      .where(eq(langTagTable.name, createLangTagDto.name))
      .limit(1)

    return [insertedRecord]
  }

  async findAll(paginationDto: PaginationDto) {
    // 兜底转换为数字，使用默认值
    const page = Number(paginationDto.page) || 1
    const pageSize = Number(paginationDto.pageSize) || 10
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
    await db.delete(langTagTable).where(eq(langTagTable.id, id))

    return { success: true }
  }

  async update(id: number, updateLangTagDto: CreateLangTagDto) {
    await db
      .update(langTagTable)
      .set({
        ...updateLangTagDto,
        updatedAt: sql`NOW()`,
      })
      .where(eq(langTagTable.id, id))

    // MySQL doesn't support returning, so we need to query the updated record
    const [updatedRecord] = await db
      .select()
      .from(langTagTable)
      .where(eq(langTagTable.id, id))
      .limit(1)

    return [updatedRecord]
  }

  async findById(id: number) {
    return await db.select().from(langTagTable).where(eq(langTagTable.id, id))
  }
}
