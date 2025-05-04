import {
  integer,
  pgTable,
  varchar,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

export const businessTagTable = pgTable('business_tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const langTagTable = pgTable('lang_tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

/**
 * id:1001,
 * business_tag_id: 1,
 * translations:{
 *    title: {
 *       en: "this is title",
 *       zh: "我是标题",
 *    }
 * }
 */

export type TranslationContent = {
  [key: string]: {
    [langTagName: string]: string;
  };
};

export const translationTable = pgTable('translation', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  business_tag_id: integer()
    .notNull()
    .references(() => businessTagTable.id),
  translations: jsonb('translations').$type<TranslationContent>().notNull(),
});
