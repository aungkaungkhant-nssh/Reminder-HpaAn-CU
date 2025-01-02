"use server"

import { db } from "@/db"
import { remindersTable } from "@/db/schema";


type NewReminder = typeof remindersTable.$inferInsert;
export const createReminder = async (data: NewReminder) => {
    try {
        await db.insert(remindersTable).values(data);
    } catch (err) {
        console.error(err)
    }
}