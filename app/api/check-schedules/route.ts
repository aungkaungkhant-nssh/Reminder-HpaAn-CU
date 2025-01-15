import { getAllSchedules } from "@/server/action/schedule";

export async function GET() {
    const schedule = await getAllSchedules();
    console.log(schedule)
    return new Response(JSON.stringify({ message: 'Hello, Next.js!' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}