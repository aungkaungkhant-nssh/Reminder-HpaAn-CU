"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AcademicYears } from "../navbar/Navbar"
import { BellIcon } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ReminderSchema } from "@/types/reminder";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form"
import { createReminder } from "@/server/action/reminders"
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function AddEmail({ academicYears }: { academicYears: AcademicYears[] }) {

    const [isOpen, setIsOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(ReminderSchema),
        defaultValues: {
            email: "",
            academicYearId: "",
        }
    })


    const onSubmit = async (data: z.infer<typeof ReminderSchema>) => {
        const name = data.email.split('@')[0];
        const reminder = {
            ...data,
            name,
            academicYearId: parseInt(data.academicYearId)
        }
        await createReminder(reminder);
        toast.success("Success Add Reminder Email")
        setIsOpen(false);

    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                className="flex gap-2 border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-md transition duration-300 ease-in-out"

            >
                <BellIcon />
                <span>Add Reminder Email</span>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Reminder Email</DialogTitle>
                    <DialogDescription>
                        By adding a reminder email, you will receive notifications about tutorials, assignments, and more.
                    </DialogDescription>
                    <div className="my-5">
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="email">Email:</FormLabel>
                                            <FormControl>
                                                <Input id="email"  {...field} placeholder="example@gmail.com" />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                                <FormField
                                    control={form.control}
                                    name="academicYearId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(selectedId) => {
                                                        field.onChange(selectedId); // Update academicYearId in the form
                                                    }}
                                                >
                                                    <SelectTrigger className="w">
                                                        <SelectValue placeholder="Select Academic Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {academicYears.map((academicYear) => (
                                                            <SelectItem key={academicYear.id} value={academicYear.id.toString()}>
                                                                {academicYear.year}
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
                                    <Button className="w-full border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-md transition duration-300 ease-in-out" variant="outline">Submit</Button>
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