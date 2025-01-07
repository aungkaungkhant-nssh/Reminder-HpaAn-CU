import { columns } from "@/components/data/columns"
import { DataTable } from "@/components/data/data-table"
import { getSchedules } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";

export default async function Presentations() {
    const assignmentSchedules = await getSchedules(ScheduleEnum.Presentation);
    return (
        <div>
            <h1 className="text-xl font-bold text-primary">Presentation Schedule Lists</h1>
            <DataTable data={assignmentSchedules} columns={columns} scheduleTitle={ScheduleEnum.Presentation} />
        </div>
    )
}