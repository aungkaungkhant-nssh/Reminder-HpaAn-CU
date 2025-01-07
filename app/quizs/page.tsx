import { columns } from "@/components/data/columns"
import { DataTable } from "@/components/data/data-table"
import { getSchedules } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";

export default async function Quizs() {
    const quizSchedules = await getSchedules(ScheduleEnum.Quiz);

    return (
        <div>
            <h1 className="text-xl font-bold text-primary">Quiz Schedule Lists</h1>
            <DataTable data={quizSchedules} columns={columns} scheduleTitle={ScheduleEnum.Quiz} />
        </div>
    )
}