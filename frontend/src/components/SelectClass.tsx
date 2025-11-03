import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectClassProps {
  value?: string
  onChange?: (value: string) => void
}

export default function SelectClass({ value, onChange }: SelectClassProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Válassz osztályt" />
      </SelectTrigger>
      <SelectContent>
        {/* Replace these with your real classes */}
        <SelectItem value="9A">9.A</SelectItem>
        <SelectItem value="10B">10.B</SelectItem>
        <SelectItem value="11C">11.C</SelectItem>
      </SelectContent>
    </Select>
  )
}
