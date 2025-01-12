"use server"

import { db } from "@/db"
import { notesTable } from "@/db/schema"
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


type Note = typeof notesTable.$inferInsert;
export const createNote = async (data: Note) => {
    try {
        await db.insert(notesTable).values(data);
        revalidatePath("/")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}


export const deleteNote = async (id: number) => {
    try {
        await db.delete(notesTable).where(eq(notesTable.id, id));
        revalidatePath("/")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}

export const updateNote = async (id: number, data: Note) => {
    try {
        await db.update(notesTable).set(data).where(eq(notesTable.id, id));
        revalidatePath("/")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}
