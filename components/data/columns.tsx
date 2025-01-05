"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"
import { DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { ScheduleEnum } from "@/utils/enum/Schedule"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { TaskStatusEnum } from "@/utils/enum/TaskStatus"

export type Teacher = {
    id: number,
    name: string,
    phone: string,
    academicYearId: number
}

export type Subject = {
    id: number,
    code: string,
    name: string
}

export type Schedule = {
    scheduleId: number,
    date: string,
    type: ScheduleEnum
    teacher: Teacher | null,
    subject: Subject | null,

}

export const columns: ColumnDef<Schedule>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "teacher.name",
        header: "Teacher",
        cell: (info) => info.getValue() || "No Teacher",
        filterFn: (row, id, filterValue) => {

            const teacherName = row.getValue("teacher_name") as string;
            return teacherName.toLowerCase().includes(filterValue.toLowerCase());
        },
    },
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => {
            const subject = row.getValue("subject") as Subject
            return (
                <div>
                    <span className="text-primary font-bold">{subject.code}</span> - {subject.name}
                </div>

            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const inputDate = row.getValue("date") as string;
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
            const targetDate = new Date(inputDate);
            return (
                <Badge
                    className={
                        cn(`
                        ${targetDate > todayDate
                                ? "bg-blue-400"
                                : targetDate === todayDate
                                    ? "bg-orange-400"
                                    : "bg-teal-400"
                            }`,
                            "hover:bg-dark"

                        )}
                >
                    {
                        targetDate > todayDate
                            ? TaskStatusEnum.Upcoming
                            : targetDate === todayDate
                                ? TaskStatusEnum.Ongoing
                                : TaskStatusEnum.Completed
                    }
                </Badge>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="cursor-pointer"
                        >
                            Edit Schedule
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                        >
                            Delete Schedule
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]