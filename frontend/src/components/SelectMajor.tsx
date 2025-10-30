import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectMajor() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Válasszon szakot"/>
      </SelectTrigger>
      <SelectContent align="start">
        <SelectGroup>
          <SelectItem value="szoftverteszt">Szoftverfejlesztő és tesztelő technikus</SelectItem>
          <SelectItem value="rendszer">Informatikai rendszer- és alkalmazás-üzemeltető</SelectItem>
          <SelectItem value="rendszerTechnikus">Informatikai rendszer- és alkalmazás-üzemeltető technikus</SelectItem>
          <SelectItem value="gepeszTechnikus">Gépész technikus</SelectItem>
          <SelectItem value="gepgyartasTechnikus">Gépgyártás-technológiai technikus</SelectItem>
          <SelectItem value="nyek">Két tanítási nyelvű gépész technikus</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
