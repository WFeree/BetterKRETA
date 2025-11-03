"use client"

import * as React from "react"
import { format, parseISO } from "date-fns"
import { hu } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Props {
  value?: string
  onChange?: (v?: string) => void
  required?: boolean
  name?: string
  className?: string
}

const SelectDate = React.forwardRef<HTMLDivElement, Props>(
  ({ value, onChange = () => {}, required = false, name, className }, ref) => {
    const currentYear = new Date().getFullYear()
    const [month, setMonth] = React.useState<Date>(() => {
      return value ? parseISO(value) : new Date()
    })

    React.useEffect(() => {
      const newDate = value ? parseISO(value) : new Date()
      setMonth(newDate)
    }, [value])

    const selectedDate = value ? parseISO(value) : undefined

    return (
      <div ref={ref}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-60 justify-start text-left font-normal",
                !value && "text-muted-foreground",
                className
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? (
                format(parseISO(value), "yyyy.MM.dd", { locale: hu })
              ) : (
                <span>Válassz dátumot</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <div className="px-3 py-2 flex justify-between items-center">
              <select
                className="bg-transparent outline-none"
                value={month.getFullYear()}
                onChange={(e) =>
                  setMonth(new Date(Number(e.target.value), month.getMonth()))
                }
              >
                {Array.from(
                  { length: currentYear - 1980 + 1 },
                  (_, i) => 1980 + i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              <select
                className="bg-transparent outline-none"
                value={month.getMonth()}
                onChange={(e) =>
                  setMonth(new Date(month.getFullYear(), Number(e.target.value)))
                }
              >
                {Array.from({ length: 12 }, (_, i) =>
                  format(new Date(2024, i, 1), "LLLL", { locale: hu })
                ).map((m, i) => (
                  <option key={i} value={i}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="[&_.rdp-caption]:hidden [&_.rdp-nav]:hidden">
              <Calendar
                mode="single"
                selected={selectedDate}
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
                locale={hu}
              />
            </div>
          </PopoverContent>
        </Popover>

        {name && (
          <input type="hidden" name={name} value={value ?? ""} required={required} />
        )}
      </div>
    )
  }
)

SelectDate.displayName = "SelectDate"

export default SelectDate