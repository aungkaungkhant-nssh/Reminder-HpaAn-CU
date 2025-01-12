import { columns } from "@/components/data/columns"
import { DataTable } from "@/components/data/data-table"
import { getSchedules } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";
import { Props } from "../page";

export default async function Quizs({ searchParams }: Props) {
    const currentPage = +searchParams.page;
    const quizSchedules = await getSchedules(ScheduleEnum.Quiz, currentPage);
    return (
        <div>
            <h1 className="text-xl font-bold text-primary">Quiz Schedule Lists</h1>
            <DataTable
                data={quizSchedules.items}
                columns={columns}
                scheduleTitle={ScheduleEnum.Quiz}
                meta={quizSchedules.meta}
                currentPage={currentPage}
            />
        </div>
    )
}