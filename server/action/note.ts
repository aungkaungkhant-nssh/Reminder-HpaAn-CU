"use server"

import { db } from "@/db"
import { notesTable } from "@/db/schema"


type Note = typeof notesTable.$inferInsert;
export const createNote = async (data: Note) => {
    try {
        await db.insert(notesTable).values(data);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // if (err.code === "23505" && err.constraint === "reminders_email_unique") {
        //     throw new Error(JSON.stringify({ type: "DUPLICATE_EMAIL", message: "This email is already in use." }));
        // } else if (err.code === "23503" && err.constraint === "reminders_academicYearId_academic_years_id_fk") {
        //     throw new Error(JSON.stringify({ type: "INVALID_ACADEMIC_YEAR", message: "Selected academic year does not exist." }));
        // }
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}


