import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const remindersTable = pgTable("reminders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    academicYearId: integer()
        .notNull()
        .unique()
        .references(() => academicYearsTable.id)
});

export const academicYearsTable = pgTable("academic_years", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    year: varchar({ length: 100 }).notNull().unique()
});