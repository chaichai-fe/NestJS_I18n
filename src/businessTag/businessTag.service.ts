import { Injectable } from '@nestjs/common'
import CreateBusinessTagDto from './dto/create-businessTag.dto'
import { businessTagTable } from '../db/schema'
import db from '../db'
import { eq, sql } from 'drizzle-orm'
import { PaginationDto } from '../common/dto/pagination.dto'
@Injectable()
export class BusinessTagService {
  async create(createBusinessTagDto: CreateBusinessTagDto) {
    await db.insert(businessTagTable).values(createBusinessTagDto)

    // MySQL doesn't support returning, so we need to query the inserted record
    const [insertedRecord] = await db
      .select()
      .from(businessTagTable)
      .where(eq(businessTagTable.name, createBusinessTagDto.name))
      .limit(1)

    return [insertedRecord]
  }

  async findAll(paginationDto: PaginationDto) {
    // 兜底转换为数字，使用默认值
    const page = Number(paginationDto.page) || 1
    const pageSize = Number(paginationDto.pageSize) || 10
    const offset = (page - 1) * pageSize

    const [data, total] = await Promise.all([
      db.select().from(businessTagTable).limit(pageSize).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(businessTagTable),
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
    await db.delete(businessTagTable).where(eq(businessTagTable.id, id))

    return { success: true }
  }

  async update(id: number, updateBusinessTagDto: CreateBusinessTagDto) {
    await db
      .update(businessTagTable)
      .set({
        ...updateBusinessTagDto,
        updatedAt: sql`NOW()`,
      })
      .where(eq(businessTagTable.id, id))

    // MySQL doesn't support returning, so we need to query the updated record
    const [updatedRecord] = await db
      .select()
      .from(businessTagTable)
      .where(eq(businessTagTable.id, id))
      .limit(1)

    return [updatedRecord]
  }

  async findById(id: number) {
    return await db
      .select()
      .from(businessTagTable)
      .where(eq(businessTagTable.id, id))
  }
}
