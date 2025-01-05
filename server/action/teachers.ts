"use server"

import { db } from "@/db"
import { teachersTable } from "@/db/schema"

export const getTeachers = async () => {
    const teachers = await db.select().from(teachersTable);
    return teachers;
}