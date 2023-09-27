import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core'

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createAt: timestamp("create_at").notNull().defaultNow(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id").notNull(),
  editorState: text("editor_state"),
})

export type NoteType = typeof $notes.$inferInsert

