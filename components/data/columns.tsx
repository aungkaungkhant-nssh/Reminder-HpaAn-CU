"use client"

import { TaskStatusEnum } from "@/utils/enum/TaskStatus"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "../ui/dropdown-menu"
import { DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "../ui/checkbox"


export type Task = {
    teacherName: string
    status: TaskStatusEnum,
    date: string
}

export const columns: ColumnDef<Task>[] = [
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
    // {
    //     accessorKey: "id",
    //     header: "id",
    // },
    {
        accessorKey: "teacherName",
        header: "Teacher Name",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
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