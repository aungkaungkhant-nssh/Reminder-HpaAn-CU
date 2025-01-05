"use server"

import { db } from "@/db"
import { academicYearsTable } from "@/db/schema"

export const getAcademicYears = async () => {
    const academicYears = await db.select().from(academicYearsTable);
    return academicYears
}