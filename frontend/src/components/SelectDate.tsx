import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type DateInputProps = {
  label?: string
  value?: string
  onChange: (iso: string) => void
  className?: string
  required?: boolean
  min?: string
  max?: string
}

export default function SelectDate({
  value = "",
  onChange,
  className,
  required = false,
  min,
  max
}: DateInputProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
        max={max}
        className="w-full"
      />
    </div>
  )
}