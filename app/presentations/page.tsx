import { columns } from "@/components/data/columns"
import { DataTable } from "@/components/data/data-table"
import { getSchedules } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";
import { Props } from "../page";

export default async function Presentations({ searchParams }: Props) {
    const currentPage = +searchParams.page;
    const assignmentSchedules = await getSchedules(ScheduleEnum.Presentation, currentPage);
    return (
        <div>
            <h1 className="text-xl font-bold text-primary">Presentation Schedule Lists</h1>
            <DataTable
                data={assignmentSchedules.items}
                columns={columns}
                scheduleTitle={ScheduleEnum.Presentation}
                totalCount={assignmentSchedules.totalCount}
                currentPage={currentPage}
            />
        </div>
    )
}