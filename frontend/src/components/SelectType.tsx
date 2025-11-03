import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectTypeProps {
  value?: string
  onChange?: (value: string) => void
}

export default function SelectType({ value, onChange }: SelectTypeProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Válassz jelleget" />
      </SelectTrigger>
      <SelectContent>
        {/* Replace these with your real street types */}
        <SelectItem value="utca">utca</SelectItem>
        <SelectItem value="tér">tér</SelectItem>
        <SelectItem value="út">út</SelectItem>
        <SelectItem value="körút">körút</SelectItem>
      </SelectContent>
    </Select>
  )
}
