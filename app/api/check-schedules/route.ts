import { getReminders } from "@/server/action/reminders";
import { getAllSchedules } from "@/server/action/schedule";
import sendingEmail from "@/utils/email";
import { ScheduleEnum } from "@/utils/enum/Schedule";
import ReminderEmailTemplate from "@/utils/template/ReminderEmailTemplate";
import { isSameDay, subDays } from "date-fns";

export async function GET() {
    const schedules = await getAllSchedules();
    const reminders = await getReminders();
    const today = new Date();

    schedules.map(item => {
        const before2Days = subDays(item.date, 2);
        if (isSameDay(before2Days, today)) {
            reminders.map(async (reminder) => {
                const template = ReminderEmailTemplate(reminder.email, { ...item, scheduleId: item.id, type: item.type as ScheduleEnum });
                await sendingEmail(template);
            })
        }
    });

    return new Response(JSON.stringify({ message: 'Hello, Next.js!' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}