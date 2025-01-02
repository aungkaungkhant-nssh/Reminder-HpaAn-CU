import * as z from 'zod'

export const ReminderSchema = z.object({
    id: z.number().optional(),
    email: z.string().nonempty("Email is required").email("Invalid email"),
    academicYearId: z.string().nonempty("Select an academic year"),
})

export type ReminderSchemaType = z.infer<typeof ReminderSchema>;