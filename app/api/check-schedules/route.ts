import { getReminders } from "@/server/action/reminders";
import { getAllSchedules } from "@/server/action/schedule";
import { sendEmail } from "@/utils/email";
import { isSameDay, subDays } from "date-fns";

export async function GET() {
    const schedules = await getAllSchedules();
    const reminders = await getReminders();
    const today = new Date();

    schedules.map(item => {
        const before2Days = subDays(item.date, 2);

        if (isSameDay(before2Days, today)) {
            reminders.map(async (reminder) => {
                if (reminder.email === 'bounceback101010@gmail.com') {
                    await sendEmail(reminder.email, "Alert", "Testing");
                }
            })
        }

        // console.log("w")

    });

    return new Response(JSON.stringify({ message: 'Hello, Next.js!' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}