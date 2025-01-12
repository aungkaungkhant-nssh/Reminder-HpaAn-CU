"use client"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon, EditIcon, NotepadText } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "@/types/note";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import SubmitButton from "../ui/submit-button";
import * as z from 'zod';
import { handleError } from "@/utils/error-handling";
import toast from "react-hot-toast";
import { Note } from "../data/columns";
import { createNote, deleteNote, updateNote } from "@/server/action/note";


export default function AddNote({ scheduleId, notes }: { scheduleId: number, notes: Note[] | null }) {
    const [isEdit, setIsEdit] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(NoteSchema),
        defaultValues: {
            task: "",
            id: "",
        }
    })

    const onSubmit = (data: z.infer<typeof NoteSchema>) => {
        startTransition(async () => {
            delete data.id
            try {
                if (form.getValues("id") && isEdit) {

                    await updateNote(+form.getValues("id"), { ...data, scheduleId })
                } else {
                    await createNote({
                        ...data,
                        scheduleId
                    })
                }

                form.setValue("task", "")
                // toast.success(`Success ${form.getValues("id") && isEdit ? "Update" : "add"} task`)
            } catch (err) {
                handleError(err);
            }

        })
    }

    const handleDelete = async (noteId: number) => {
        try {
            await deleteNote(noteId);
            toast.success("Success Delete Note")
        } catch {
            toast.error("Unexpected Error occur")
        }
    }


    return (
        <Dialog onOpenChange={() => {
            form.setValue("task", "")
            form.setValue("id", "")
        }}>
            <DialogTrigger asChild>
                <NotepadText className="text-primary cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[505px]">
                <DialogHeader>
                    <DialogTitle>Notes</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {
                        notes?.length ? (
                            <ul className="space-y-4 pl-6 text-gray-800">
                                {
                                    notes?.map((note) => (
                                        <li key={note.id} className="hover:text-primary transition-colors duration-200 flex gap-2 items-center">
                                            <span className="text-sm font-medium group-hover:text-primary">
                                                {note.task}
                                            </span>
                                            <div className="flex gap-1">
                                                <button
                                                    aria-label="Edit"
                                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-100 transition duration-300 outline-none"
                                                    onClick={() => {
                                                        form.setValue("task", note.task);
                                                        form.setValue("id", note.id.toString())
                                                        setIsEdit(true)
                                                    }}
                                                >
                                                    <EditIcon size={18} className="text-blue-500" />
                                                </button>
                                                <button
                                                    aria-label="Delete"
                                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 transition duration-300"
                                                    onClick={() => handleDelete(note.id)}
                                                >
                                                    <TrashIcon size={18} className="text-red-500" />
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <p className="text-gray-600">No tasks available. Add your first task!</p>
                        )
                    }

                </div>
                <DialogFooter className="  gap-2">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-row items-start space-x-2">
                            <FormField
                                control={form.control}
                                name="task"
                                render={({ field }) => (
                                    <FormItem className="flex-grow w-3/4">
                                        <FormControl>
                                            <Input id="task" {...field} placeholder="Task..." className="w-full" />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>
                            <div className="w-1/4">
                                <SubmitButton text={`${isEdit ? "Update " : "Add "} Task`} isPending={isPending} />
                            </div>
                        </form>

                    </Form>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


