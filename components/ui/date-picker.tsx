"use client";
import * as React from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const DatePicker = ({
    value,
    onChange,
    placeholder,
}: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    placeholder: string;
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "MM/dd/yyyy") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    initialFocus
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
