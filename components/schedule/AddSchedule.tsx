"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormMessage, Form } from "../ui/form";
import { useEffect, useTransition } from "react";
import toast, { Toaster } from 'react-hot-toast';
import SubmitButton from "../ui/submit-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSubjectsStore } from "@/stores/subject-store";
import { useTeacherStore } from "@/stores/teacher-store";
import { ScheduleSchema } from "@/types/schedule";
import DatePicker from "../ui/date-picker";
import { handleError } from "@/utils/error-handling";
import { createSchedule, getSchedule, updateSchedule } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";
import { useScheduleModelStore } from "@/stores/schedule-model-store";

export default function AddSchedule({ scheduleTitle }: { scheduleTitle: ScheduleEnum }) {
    const { subjects } = useSubjectsStore();
    const { teachers } = useTeacherStore();
    const [isPending, startTransition] = useTransition();
    const { isOpen, isEdit, id, showModel } = useScheduleModelStore();

    const form = useForm({
        resolver: zodResolver(ScheduleSchema),
        defaultValues: {
            date: "",
            teacherId: "",
            subjectId: "",
            type: ""
        }
    })

    const onSubmit = (data: z.infer<typeof ScheduleSchema>) => {
        startTransition(async () => {
            try {
                if (isEdit && id) {
                    await updateSchedule(id, {
                        teacherId: +data.teacherId,
                        subjectId: +data.subjectId,
                        date: data.date,
                        type: scheduleTitle
                    })
                } else {
                    await createSchedule({
                        teacherId: +data.teacherId,
                        subjectId: +data.subjectId,
                        date: data.date,
                        type: scheduleTitle
                    })
                }

                toast.success(`Success ${isEdit ? "Update" : "Add"} Schedule`)
                showModel({
                    isOpen: false,
                    isEdit: false,
                    id: null
                });
            } catch (err) {
                handleError(err);
            }

        })
    };

    const checkSchedule = async (isEdit: boolean, id: number) => {
        if (isEdit) {
            const schedule = await getSchedule(id);
            if (schedule.length) {
                form.setValue("date", schedule[0].date)
                form.setValue("teacherId", schedule[0]?.teacher ? schedule[0].teacher.id.toString() : "")
                form.setValue("subjectId", schedule[0]?.subject ? schedule[0].subject.id.toString() : "")
                form.setValue("type", schedule[0].type)
            }
        }
    }
    useEffect(() => {
        if (isEdit && id) {
            checkSchedule(isEdit, id)
        }
    }, [isEdit, id])

    return (
        <Dialog open={isOpen}
            onOpenChange={(open) => {
                if (isEdit && id) {
                    form.setValue("date", "")
                    form.setValue("teacherId", "")
                    form.setValue("subjectId", "")
                    form.setValue("type", "")
                }
                showModel({
                    isOpen: open,
                    isEdit: false,
                    id: null
                })
            }
            }

        >
            <DialogTrigger
                className="flex gap-2 border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-md transition duration-300 ease-in-out"
            >
                <span>Add New</span>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit" : "Add"} {scheduleTitle}</DialogTitle>
                    <DialogDescription>
                        You may select the date, teacher, and subject for the schedule.
                    </DialogDescription>
                    <div className="my-5">
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <DatePicker
                                                    value={field.value ? new Date(field.value) : undefined}
                                                    onChange={(date) => field.onChange(date?.toDateString())}
                                                    placeholder={(isEdit && id && !form.getValues().teacherId) ? "Loading..." : "Select a date"}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                >

                                </FormField>
                                <div className="my-3">
                                    <FormField
                                        control={form.control}
                                        name="teacherId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(selectedId) => {
                                                            field.onChange(selectedId);
                                                        }}
                                                    >
                                                        <SelectTrigger className="w">
                                                            <SelectValue placeholder={(isEdit && id && !form.getValues().teacherId) ? "Loading..." : "Select a teacher"} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {teachers.map((teacher) => (
                                                                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                                                    {teacher.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="subjectId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(selectedId) => {
                                                        field.onChange(selectedId);
                                                    }}
                                                >
                                                    <SelectTrigger className="w">
                                                        <SelectValue placeholder={(isEdit && id && !form.getValues().teacherId) ? "Loading..." : "Select a Subject"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {subjects.map((subject) => (
                                                            <SelectItem key={subject.id} value={subject.id.toString()}>
                                                                {subject.code} - {subject.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                <div className="mt-4">
                                    <SubmitButton text={`${isEdit ? 'Update' : 'Add'} Schedule`} isPending={isPending} />
                                </div>
                            </form>

                        </Form>

                    </div>
                </DialogHeader>
            </DialogContent>
            <Toaster />
        </Dialog>
    )
}

