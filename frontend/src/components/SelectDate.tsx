"use client"

import * as React from "react"
import { format } from "date-fns"
import { hu } from "date-fns/locale"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function SelectDate() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "min-w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "yyyy.MM.dd", { locale: hu }) : <span>Válasszon dátumot</span>}
          <ChevronDown className="mr-2 h-4 w-4 ml-auto" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <CustomCalendar date={date} setDate={setDate} />
      </PopoverContent>
    </Popover>
  )
}

export function CustomCalendar({
  date,
  setDate,
}: {
  date?: Date
  setDate: (d?: Date) => void
}) {
  const [month, setMonth] = React.useState<Date>(date || new Date())

  // const currentYear = new Date().getFullYear()

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={month}
        onMonthChange={setMonth}
        locale={hu}
        // initialFocus
        captionLayout="dropdown"
        hideNavigation
        // fromYear={1980}
        // toYear={currentYear}
      />
    </div>
  )
}
