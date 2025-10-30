import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft } from "lucide-react"

import { SelectType as SelectJelleg } from "./SelectType"
import { SelectClass }  from "./SelectClass"
import {SelectMajor}  from "./SelectMajor"
import { SelectDate } from "./SelectDate"
import { ZipInput } from "./ZipInput"

export default function AddStudentForm() {
  const [isDormStudent, setIsDormStudent] = useState(false)

  return (
    <div id="container" className="mx-auto w-[80%] px-10">
      <div className="flex items-center justify-between">
        <div id="vissza" className="flex text-gray-500"><ChevronLeft/><span>Vissza</span></div>
        <h2 className="font-bold text-2xl text-center py-6">Új tanuló hozzáadása</h2>
        <div className="text-gray-500">Törzslapszám: <span>{}</span></div>
      </div>
      <h3 className="font-bold">Személyes adatok</h3>
      <div id="personal" className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div id="left" className="flex flex-col gap-4">
          <div>
            <Label className="py-2">Név</Label>
            <Input></Input>
          </div>
          <div>
            <Label className="py-2">Anyja neve</Label>
            <Input></Input>
          </div>
        </div>

        <div id="right" className="flex flex-col gap-4">
          <div>
            <Label className="py-2">Születési helye</Label>
            <Input></Input>
          </div>
          <div>
            <Label className="py-2">Születési ideje</Label>
            <SelectDate/>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between gap-2 pt-6 flex-wrap md:flex-nowrap">
            <div className="w-full">
              <Label className="py-2">Irányítószám</Label>
              <ZipInput/>
            </div>
            <div className="w-full">
              <Label className="py-2">Település</Label>
              <Input />
            </div>
            <div className="w-full">
              <Label className="py-2">Közter. neve</Label>
              <Input />
            </div>
            <div className="w-full">
              <Label className="py-2 text-nowrap">Közter. jellege</Label>
              <SelectJelleg/>
            </div>
            <div className="w-full">
              <Label className="py-2">Házszám</Label>
              <Input/>
            </div>
          </div>

      <Separator className="my-6"/>

      <h3 className="font-bold">Beiratkozás adatai</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        <div id="left" className="flex flex-col gap-4 ">
          <div className="w-full">
            <Label className="py-2">Beiratkozás időpontja</Label>
            <SelectDate></SelectDate>
          </div>

          <div className="w-full flex gap-4 flex-wrap md:flex-nowrap">
            <div className="w-full md:max-w-[76%]">
              <Label className="py-2">Szak</Label>
              <SelectMajor></SelectMajor>
            </div>
            <div className="w-full md:min-w-[20%]">
              <Label className="py-2">Osztály</Label>
              <SelectClass></SelectClass>
            </div>
          </div>

        </div>

        <div id="right" className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-1 min-h-20">
            <Label htmlFor="dorm" className="pt-2 pb-1">Kollégista?</Label>
            <Checkbox
              id="dorm"
              className="h-9 w-9"
              checked={isDormStudent}
              onCheckedChange={(checked) => setIsDormStudent(!!checked)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="dormWhere">Kollégium neve</Label>
            <Input
              id="dormWhere"
              disabled={!isDormStudent}
            />
          </div>
        </div>
      </div>
      <Button className="w-full hover:cursor-pointer">Új tanuló hozzáadása</Button>
    </div>
  )
}
// TODO: Save gomb, mentés is
// TODO: Törzslapszám generálás
// TODO: ADMIN felület