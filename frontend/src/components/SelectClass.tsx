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
        <SelectItem value="A">A</SelectItem>
        <SelectItem value="B">B</SelectItem>
        <SelectItem value="C">C</SelectItem>
        <SelectItem value="D">D</SelectItem>
        <SelectItem value="E">E</SelectItem>
        <SelectItem value="F">F</SelectItem>
        <SelectItem value="G">G</SelectItem>
      </SelectContent>
    </Select>
  )
}
