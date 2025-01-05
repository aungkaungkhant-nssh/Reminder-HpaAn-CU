"use server"

import { db } from "@/db"
import { subjectsTable } from "@/db/schema"

export const getSubjects = async () => {
    const subjects = await db.select().from(subjectsTable);
    return subjects;
}