"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "../ui/input";
import AddSchedule from "../schedule/AddSchedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";
import { LIMIT } from "@/utils/constant/limit";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    scheduleTitle: ScheduleEnum,
    meta: {
        totalCount: number,
        hasNextPage: boolean
    }
    currentPage: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    scheduleTitle,
    meta,
    currentPage
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    const totalPages = Math.ceil(meta.totalCount / LIMIT);
    return (
        <div className="rounded-md  w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search"
                    value={(table.getColumn("teacher_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("teacher_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-44 md:max-w-sm"
                />
                <div className="flex items-center gap-1">
                    <AddSchedule scheduleTitle={scheduleTitle} />
                </div>

            </div>
            <Table className="w-full table-auto border">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="table-row">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={"w-[200px]"}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="my-3">
                <Pagination>
                    <PaginationContent>
                        {
                            currentPage !== 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={`?page=${currentPage - 1}`} />
                                </PaginationItem>
                            )
                        }
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href={`?page=${index + 1}`}
                                    className={currentPage === index + 1 ? "bg-primary text-white" : ""}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {
                            meta.hasNextPage && (
                                <PaginationItem>
                                    <PaginationNext href={`?page=${currentPage + 1}`} />
                                </PaginationItem>
                            )
                        }

                    </PaginationContent>
                </Pagination>

            </div>
        </div >
    )
}
