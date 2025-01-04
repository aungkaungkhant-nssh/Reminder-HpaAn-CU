import { columns } from "@/components/data/columns"
import { DataTable } from "@/components/data/data-table"
import { TaskStatusEnum } from "@/utils/enum/TaskStatus"

export default function Assignments() {
    const data = [
        {
            // id: 1,
            teacherName: "Daw Aye Aye",
            status: TaskStatusEnum.Upcoming,
            date: "2022-01-01"
        },
        {
            // id: 1,
            teacherName: "Daw Aye Aye",
            status: TaskStatusEnum.Ongoing,
            date: "2022-01-01"
        },
        {
            // id: 1,
            teacherName: "Daw Aye Aye",
            status: TaskStatusEnum.Completed,
            date: "2022-01-01"
        }
    ]
    return (
        <div>
            <h1 className="text-xl font-bold text-primary">Assignment Schedule Lists</h1>
            <DataTable data={data} columns={columns} scheduleTitle="Assignment" />
        </div>
    )
}