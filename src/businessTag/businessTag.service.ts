import { Injectable } from '@nestjs/common';
import CreateBusinessTagDto from './dto/create-businessTag.dto';
import { businessTagTable } from '../db/schema';
import db from '../db';
import { eq } from 'drizzle-orm';
@Injectable()
export class BusinessTagService {
  async create(createBusinessTagDto: CreateBusinessTagDto) {
    return await db
      .insert(businessTagTable)
      .values(createBusinessTagDto)
      .returning();
  }

  async findAll() {
    return await db.select().from(businessTagTable);
  }

  async remove(id: number) {
    return await db
      .delete(businessTagTable)
      .where(eq(businessTagTable.id, id))
      .returning();
  }
}
