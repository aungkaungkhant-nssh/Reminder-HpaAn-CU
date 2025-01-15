"use server"

import { Schedule } from "@/components/data/columns";
import { db } from "@/db"
import { schedulesTable, subjectsTable, teachersTable } from "@/db/schema";
import { LIMIT } from "@/utils/constant/limit";
import { ScheduleEnum } from "@/utils/enum/Schedule";
import { asc, count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


type NewSchedule = typeof schedulesTable.$inferInsert;
export const createSchedule = async (data: NewSchedule) => {
    try {
        await db.insert(schedulesTable).values(data);
        revalidatePath("/")

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}

export const updateSchedule = async (id: number, data: NewSchedule) => {
    try {
        await db.update(schedulesTable).set(data).where(eq(schedulesTable.id, id));
        revalidatePath("/")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}

export const getSchedules = async (type: ScheduleEnum, page: number = 1, limit: number = LIMIT): Promise<{ items: Schedule[]; meta: { totalCount: number, hasNextPage: boolean } }> => {
    try {
        const offset = (page - 1) * limit;

        const schedulesWithRelations = await db.query.schedulesTable.findMany({
            where: eq(schedulesTable.type, type),
            orderBy: asc(schedulesTable.date),
            limit: limit,
            offset: offset,
            with: {
                teacher: true,
                subject: true,
                notes: true
            }
        });

        const schedule = await db
            .select({ count: count() })
            .from(schedulesTable)
            .where(eq(schedulesTable.type, type));

        return {
            items: schedulesWithRelations.map(schedule => ({
                scheduleId: schedule.id,
                date: schedule.date,
                type: schedule.type as ScheduleEnum,
                teacher: schedule.teacher,
                subject: schedule.subject,
                notes: schedule.notes,
            })),
            meta: {
                totalCount: schedule[0].count,
                hasNextPage: (page * limit) < schedule[0].count
            }

        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }

}

export const getAllSchedules = async () => {
    return db.query.schedulesTable.findMany({
        with: {
            teacher: true,
            subject: true,
            notes: true
        }
    });
}

export const getSchedule = async (id: number) => {
    try {
        const schedule = await db.select({
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
            .leftJoin(teachersTable, eq(schedulesTable.teacherId, teachersTable.id)) // Join teachersTable
            .leftJoin(subjectsTable, eq(schedulesTable.subjectId, subjectsTable.id)) // Join subjectsTable
            .where(eq(schedulesTable.id, id))

        return schedule;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}

export const deleteSchedule = async (id: number) => {
    try {
        await db.delete(schedulesTable).where(eq(schedulesTable.id, id));
        revalidatePath("/")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(JSON.stringify({ type: "UNKNOWN_ERROR", message: err.detail || "An unexpected error occurred." }));
    }
}


