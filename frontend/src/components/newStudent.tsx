import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

import SelectDate from "./SelectDate"
import SelectClass from "./SelectClass"
import SelectMajor from "./SelectMajor"
import SelectJelleg from "./SelectType"
import ZipInput from "./ZipInput"
import { useState } from "react"

type FormValues = {
  nev: string
  anyjaNeve: string
  szuletesiHely: string
  szuletesiIdo: string
  iranyitoszam: string
  telepules: string
  kozterNev: string
  kozterJelleg: string
  hazszam: string
  beiratkozasIdeje: string
  szak: string
  osztaly: string
  kollegista: boolean
  kollegiumNeve?: string
}

export default function NewStudent() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      kollegista: false,
      szuletesiIdo: "",
      beiratkozasIdeje: "",
    },
  })

  const isDormStudent = watch("kollegista")

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const [first_name, ...rest] = data.nev.trim().split(" ");
    const last_name = rest.join(" ") || "";

    const username = (first_name + last_name).toLowerCase();
    const password = "valtoztasdmeg123";


    const formatDate = (date: string) => {
      if (date.includes('-')) return date;
      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const payload = {
      username,
      password,
      ...data,
      szuletesiIdo: formatDate(data.szuletesiIdo),
      beiratkozasIdeje: formatDate(data.beiratkozasIdeje),
    };

    console.log("Sending payload:", payload);

    const response = await fetch("http://localhost:8000/api/students/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Backend response:", result);
  };


  const inputErrorClass = (name: keyof FormValues) =>
    errors[name] ? "border-red-500 focus-visible:ring-red-500" : ""

  return (
    <div id="container" className="mx-auto max-w-4xl px-10">
      <h2 className="font-bold text-2xl text-center py-6">Új tanuló hozzáadása</h2>

      <h3 className="font-bold">Személyes adatok</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="personal" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div id="left" className="flex flex-col gap-4">
            <div>
              <Label className="py-2">Név</Label>
              <Input
                className={inputErrorClass("nev")}
                {...register("nev", {
                  required: "A név megadása kötelező",
                  validate: (v) =>
                    v.trim().split(" ").length >= 2 || "Legalább két szóból kell állnia",
                })}
              />
              {errors.nev && <p className="text-red-500 text-sm">{errors.nev.message}</p>}
            </div>

            <div>
              <Label className="py-2">Anyja neve</Label>
              <Input
                className={inputErrorClass("anyjaNeve")}
                {...register("anyjaNeve", {
                  required: "Anyja neve kötelező",
                })}
              />
              {errors.anyjaNeve && <p className="text-red-500 text-sm">{errors.anyjaNeve.message}</p>}
            </div>
          </div>

          <div id="right" className="flex flex-col gap-4">
            <div>
              <Label className="py-2">Születési helye</Label>
              <Input
                className={inputErrorClass("szuletesiHely")}
                {...register("szuletesiHely", { required: "A születési hely kötelező" })}
              />
              {errors.szuletesiHely && <p className="text-red-500 text-sm">{errors.szuletesiHely.message}</p>}
            </div>

            <div>
              <Label className="py-2">Születési ideje</Label>
              <Controller
                name="szuletesiIdo"
                control={control}
                rules={{ required: "A születési idő kötelező" }}
                render={({ field }) => (
                  <SelectDate value={field.value} onChange={field.onChange} required />
                )}
              />
              {errors.szuletesiIdo && <p className="text-red-500 text-sm">{errors.szuletesiIdo.message}</p>}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between gap-2 pt-6 flex-wrap md:flex-nowrap">
          <div className="w-full">
            <Label className="py-2">Irányítószám</Label>
            <Controller
              control={control}
              name="iranyitoszam"
              rules={{
                required: "Irányítószám kötelező",
                maxLength: { value: 4, message: "Legfeljebb 4 számjegy lehet" },
                pattern: { value: /^[0-9]{4}$/, message: "Csak számokat tartalmazhat" },
              }}
              render={({ field }) => <ZipInput value={field.value} onChange={field.onChange} />}
            />
            {errors.iranyitoszam && <p className="text-red-500 text-sm">{errors.iranyitoszam.message}</p>}
          </div>

          <div className="w-full">
            <Label className="py-2">Település</Label>
            <Input
              className={inputErrorClass("telepules")}
              {...register("telepules", { required: "Település megadása kötelező" })}
            />
            {errors.telepules && <p className="text-red-500 text-sm">{errors.telepules.message}</p>}
          </div>

          <div className="w-full">
            <Label className="py-2">Közter. neve</Label>
            <Input
              className={inputErrorClass("kozterNev")}
              {...register("kozterNev", { required: "A közterület neve kötelező" })}
            />
            {errors.kozterNev && <p className="text-red-500 text-sm">{errors.kozterNev.message}</p>}
          </div>

          <div className="w-full">
            <Label className="py-2 text-nowrap">Közter. jellege</Label>
            <Controller
              control={control}
              name="kozterJelleg"
              rules={{ required: "A közterület jellege kötelező" }}
              render={({ field }) => <SelectJelleg value={field.value} onChange={field.onChange} />}
            />
            {errors.kozterJelleg && <p className="text-red-500 text-sm">{errors.kozterJelleg.message}</p>}
          </div>

          <div className="w-full">
            <Label className="py-2">Házszám</Label>
            <Input
              className={inputErrorClass("hazszam")}
              {...register("hazszam", { required: "Házszám kötelező" })}
            />
            {errors.hazszam && <p className="text-red-500 text-sm">{errors.hazszam.message}</p>}
          </div>
        </div>

        <Separator className="my-6" />

        <h3 className="font-bold">Beiratkozás adatai</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          <div id="left" className="flex flex-col gap-4 ">
            <div className="w-full">
              <Label className="py-2">Beiratkozás időpontja</Label>
              <Controller
                name="beiratkozasIdeje"
                control={control}
                rules={{ required: "Beiratkozás időpontja kötelező" }}
                render={({ field }) => <SelectDate value={field.value} onChange={field.onChange} />}
              />
            </div>

            <div className="w-full flex gap-4 flex-wrap md:flex-nowrap">
              <div className="w-full md:max-w-[50%] min-w-[50%]">
                <Label className="py-2">Szak</Label>
                <Controller
                  control={control}
                  name="szak"
                  rules={{ required: "Szak megadása kötelező" }}
                  render={({ field }) => <SelectMajor value={field.value} onChange={field.onChange} />}
                />
              </div>

              <div className="w-full md:max-w-[50%]">
                <Label className="py-2">Osztály</Label>
                <Controller
                  control={control}
                  name="osztaly"
                  rules={{ required: "Osztály megadása kötelező" }}
                  render={({ field }) => <SelectClass value={field.value} onChange={field.onChange} />}
                />
              </div>
            </div>
          </div>

          <div id="right" className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1 min-h-20">
              <Label htmlFor="dorm" className="pt-2 pb-1">Kollégista?</Label>
              <Controller
                control={control}
                name="kollegista"
                render={({ field }) => (
                  <Checkbox id="dorm" className="h-9 w-9" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="dormWhere">Kollégium neve</Label>
              <Input
                id="dormWhere"
                className={inputErrorClass("kollegiumNeve")}
                disabled={!isDormStudent}
                {...register("kollegiumNeve", {
                  required: isDormStudent ? "A kollégium neve kötelező" : false,
                })}
              />
              {errors.kollegiumNeve && <p className="text-red-500 text-sm">{errors.kollegiumNeve.message}</p>}
            </div>
          </div>
        </div>

        <Button className="w-full hover:cursor-pointer mb-4" type="submit">
          Új tanuló hozzáadása
        </Button>
      </form>
    </div>
  )
}
