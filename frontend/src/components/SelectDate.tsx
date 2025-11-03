import * as React from "react"
import { format, parseISO } from "date-fns"
import { hu } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

type SelectDateProps = {
  value?: string 
  onChange?: (v?: string) => void
}

export default function SelectDateDebug({ value, onChange = () => {} }: SelectDateProps) {
  const parsed = value ? parseISO(value) : undefined
  const [month, setMonth] = React.useState<Date>(() => (parsed ? parsed : new Date()))

  React.useEffect(() => {
    if (parsed) setMonth(parsed)
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value : "Dátum kiválasztása"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 z-50" align="start">
        <div className="border bg-white">
          <Calendar
            locale={hu}
            mode="single"
            selected={parsed}
            onSelect={(d) => {
              if (!d) {
                onChange(undefined)
              } else {
                const iso = d.toISOString().slice(0, 10)             
                onChange(iso)
              }
            }}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            hideNavigation
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
export const SelectDate = React.forwardRef<HTMLButtonElement, SelectDateProps>(
  ({ value, onChange }, ref) => {
    const [open, setOpen] = React.useState(false)
    const parsedValue = value ? new Date(value) : undefined
    const [month, setMonth] = React.useState<Date>(parsedValue || new Date())

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !parsedValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {parsedValue
              ? format(parsedValue, "yyyy.MM.dd")
              : "Dátum kiválasztása"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" align="start">
          <Calendar
            locale={hu}
            mode="single"
            selected={parsedValue}
            onSelect={(d) => {
              if (d) onChange?.(format(d, "yyyy.MM.dd"))
              setOpen(false)
            }}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            hideNavigation
          />
        </PopoverContent>
      </Popover>
    )
  }
)

SelectDate.displayName = "SelectDate"