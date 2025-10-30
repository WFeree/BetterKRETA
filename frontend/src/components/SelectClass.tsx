import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectClass() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Válasszon osztályt"/>
      </SelectTrigger>
      <SelectContent align="start">
        <SelectGroup>
          <SelectItem value="A">A</SelectItem>
          <SelectItem value="B">B</SelectItem>
          <SelectItem value="C">C</SelectItem>
          <SelectItem value="D">D</SelectItem>
          <SelectItem value="E">E</SelectItem>
          <SelectItem value="F">F</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
