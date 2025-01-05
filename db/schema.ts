import { date, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
export const typesEnum = pgEnum("types", ["Tutorial", "Assignment", "Quiz", "Presentation"]);

export const remindersTable = pgTable("reminders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    academicYearId: integer()
        .notNull()
        .references(() => academicYearsTable.id)
});

export const academicYearsTable = pgTable("academic_years", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    year: varchar({ length: 100 }).notNull().unique()
});

export const teachersTable = pgTable("teachers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 255 }).notNull(),
    academicYearId: integer()
        .notNull()
        .references(() => academicYearsTable.id)
})

export const subjectsTable = pgTable("subjects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    code: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull()
})

export const schedulesTable = pgTable("schedules", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    date: date().notNull(),
    teacherId: integer()
        .notNull()
        .references(() => teachersTable.id),
    subjectId: integer()
        .notNull()
        .references(() => subjectsTable.id),
    type: typesEnum().notNull()
})