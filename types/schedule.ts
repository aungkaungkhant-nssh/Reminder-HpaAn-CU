import * as z from 'zod'

export const ScheduleSchema = z.object({
    id: z.number().optional(),
    date: z
        .string()
        .nonempty({ message: "Select a date." })
        .refine((value) => !isNaN(Date.parse(value)), {
            message: "Invalid date format.",
        })
        .refine((value) => new Date(value) >= new Date(), {
            message: "Date cannot be in the past.",
        }),
    teacherId: z.string().nonempty("Select a teacher"),
    subjectId: z.string().nonempty("Select a subject"),
})

export type ScheduleSchemaType = z.infer<typeof ScheduleSchema>;