import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectType() {
  return (
    <Select>
      <SelectTrigger className="w-full min-w-[110px]">
        <SelectValue placeholder="..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            <SelectItem value="allé">allé</SelectItem>
            <SelectItem value="alsó rakpart">alsó rakpart</SelectItem>
            <SelectItem value="alsósor">alsósor</SelectItem>
            <SelectItem value="bekötőút">bekötőút</SelectItem>
            <SelectItem value="dűlő">dűlő</SelectItem>
            <SelectItem value="fasor">fasor</SelectItem>
            <SelectItem value="felső rakpart">felső rakpart</SelectItem>
            <SelectItem value="felsősor">felsősor</SelectItem>
            <SelectItem value="főtér">főtér</SelectItem>
            <SelectItem value="főút">főút</SelectItem>
            <SelectItem value="gát">gát</SelectItem>
            <SelectItem value="határ">határ</SelectItem>
            <SelectItem value="határsor">határsor</SelectItem>
            <SelectItem value="határút">határút</SelectItem>
            <SelectItem value="ipartelep">ipartelep</SelectItem>
            <SelectItem value="kert">kert</SelectItem>
            <SelectItem value="kertsor">kertsor</SelectItem>
            <SelectItem value="korzó">korzó</SelectItem>
            <SelectItem value="környék">környék</SelectItem>
            <SelectItem value="körönd">körönd</SelectItem>
            <SelectItem value="körtér">körtér</SelectItem>
            <SelectItem value="körút">körút</SelectItem>
            <SelectItem value="köz">köz</SelectItem>
            <SelectItem value="lakópark">lakópark</SelectItem>
            <SelectItem value="lakótelep">lakótelep</SelectItem>
            <SelectItem value="lejtő">lejtő</SelectItem>
            <SelectItem value="lépcső">lépcső</SelectItem>
            <SelectItem value="lépcsősor">lépcsősor</SelectItem>
            <SelectItem value="liget">liget</SelectItem>
            <SelectItem value="major">major</SelectItem>
            <SelectItem value="mélyút">mélyút</SelectItem>
            <SelectItem value="negyed">negyed</SelectItem>
            <SelectItem value="oldal">oldal</SelectItem>
            <SelectItem value="országút">országút</SelectItem>
            <SelectItem value="park">park</SelectItem>
            <SelectItem value="part">part</SelectItem>
            <SelectItem value="pincesor">pincesor</SelectItem>
            <SelectItem value="puszta">puszta</SelectItem>
            <SelectItem value="rakpart">rakpart</SelectItem>
            <SelectItem value="sétány">sétány</SelectItem>
            <SelectItem value="sikátor">sikátor</SelectItem>
            <SelectItem value="sor">sor</SelectItem>
            <SelectItem value="sugárút">sugárút</SelectItem>
            <SelectItem value="szállás">szállás</SelectItem>
            <SelectItem value="szektor">szektor</SelectItem>
            <SelectItem value="szél">szél</SelectItem>
            <SelectItem value="szer">szer</SelectItem>
            <SelectItem value="sziget">sziget</SelectItem>
            <SelectItem value="szőlőhegy">szőlőhegy</SelectItem>
            <SelectItem value="tag">tag</SelectItem>
            <SelectItem value="tanya">tanya</SelectItem>
            <SelectItem value="telep">telep</SelectItem>
            <SelectItem value="tér">tér</SelectItem>
            <SelectItem value="tető">tető</SelectItem>
            <SelectItem value="udvar">udvar</SelectItem>
            <SelectItem value="út">út</SelectItem>
            <SelectItem value="utca">utca</SelectItem>
            <SelectItem value="útja">útja</SelectItem>
            <SelectItem value="üdülőpart">üdülőpart</SelectItem>
            <SelectItem value="üdülősor">üdülősor</SelectItem>
            <SelectItem value="üdülőtelep">üdülőtelep</SelectItem>
            <SelectItem value="vár">vár</SelectItem>
            <SelectItem value="várkert">várkert</SelectItem>
            <SelectItem value="város">város</SelectItem>
            <SelectItem value="villasor">villasor</SelectItem>
            <SelectItem value="völgy">völgy</SelectItem>
            <SelectItem value="zug">zug</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
