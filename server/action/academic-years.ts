"use server"

import { db } from "@/db"
import { academicYearsTable } from "@/db/schema"

export const getAcademicYears = async () => {
    // return [
    //     {
    //         id: 1,
    //         year: 'First Year'
    //     },
    //     {
    //         id: 2,
    //         year: 'Second Year'
    //     },
    //     {
    //         id: 3,
    //         year: 'Third Year'
    //     },
    //     {
    //         id: 4,
    //         year: 'Fourth Year'
    //     },
    //     {
    //         id: 5,
    //         year: 'Fifth Year'
    //     },
    // ]
    const academicYears = await db.select().from(academicYearsTable);
    return academicYears
}