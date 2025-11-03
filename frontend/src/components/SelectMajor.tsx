import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectMajorProps {
  value?: string
  onChange?: (value: string) => void
}

export default function SelectMajor({ value, onChange }: SelectMajorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Válassz szakot" />
      </SelectTrigger>
      <SelectContent>
        {/* Replace these with your real majors */}
        <SelectItem value="informatika">Informatika</SelectItem>
        <SelectItem value="gepeszet">Gépészet</SelectItem>
        <SelectItem value="elektronika">Elektronika</SelectItem>
      </SelectContent>
    </Select>
  )
}
