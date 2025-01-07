"use server"

import { Schedule } from "@/components/data/columns";
import { db } from "@/db"
import { schedulesTable, subjectsTable, teachersTable } from "@/db/schema";
import { ScheduleEnum } from "@/utils/enum/Schedule";
import { eq } from "drizzle-orm";


type NewSchedule = typeof schedulesTable.$inferInsert;
export const createSchedule = async (data: NewSchedule) => {
    try {
        await db.insert(schedulesTable).values(data);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}

export const getSchedules = async (type: ScheduleEnum): Promise<Schedule[]> => {
    const schedulesWithRelations = await db
        .select({
            scheduleId: schedulesTable.id,
            date: schedulesTable.date,
            type: schedulesTable.type,
            teacher: {
                id: teachersTable.id,
                name: teachersTable.name,
                phone: teachersTable.phone,
                academicYearId: teachersTable.academicYearId,
            },
            subject: {
                id: subjectsTable.id,
                code: subjectsTable.code,
                name: subjectsTable.name,
            },
        })
        .from(schedulesTable)
        .leftJoin(teachersTable, eq(schedulesTable.teacherId, teachersTable.id))
        .leftJoin(subjectsTable, eq(schedulesTable.subjectId, subjectsTable.id))
        .where(eq(schedulesTable.type, type));

    return schedulesWithRelations.map(schedule => ({
        ...schedule,
        type: schedule.type as ScheduleEnum
    }));
}

export const deleteSchedule = async (id: number) => {
    try {
        await db.delete(schedulesTable).where(eq(schedulesTable.id, id));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}