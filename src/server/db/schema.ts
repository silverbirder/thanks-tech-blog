// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `thanks-tech-blog_${name}`);

export const blogStatusEnum = pgEnum("blog_status", [
  "in_progress",
  "contacted",
  "failed",
]);

export const technicalBlogs = createTable(
  "technical-blog",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    hash: varchar("hash", { length: 256 }).notNull(),
    url: varchar("url", { length: 2048 }).notNull(),
    comment: text("comment").notNull(),
    status: blogStatusEnum("status").default("in_progress").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (blog) => ({
    urlIndex: index("url_idx").on(blog.url),
  }),
);
