"use client"
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      {...props}
      classNames={{
        today: `border-green-500 border-2`, // Add a thicker border to today's date
        selected: `bg-green-500 border-green-500 text-white rounded`, // Highlight the selected day with rounded corners
        root: `shadow-lg p-5 rounded`, // Add a shadow and rounded corners to the root element
        month: `w-[230px] `, // Ensure the month container takes full width
        day: `w-[230px] h-10 text-center`, // Make each day cell full width and add some height for better readability
        caption: `text-lg font-bold flex justify-between items-center`, // Make the caption a flex container
        caption_label: `text-lg font-medium text-primary`, // Adjust the caption label style
        nav_button: `h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100`, // Style the navigation buttons
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeftIcon : ChevronRightIcon;
          return <Icon className='h-5 w-5 text-primary' />;
        },
      }}
    />

  );
}
Calendar.displayName = "Calendar";

export { Calendar };


