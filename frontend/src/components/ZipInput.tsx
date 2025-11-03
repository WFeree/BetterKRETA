import * as React from "react"
import { Input } from "@/components/ui/input"

type Props = {
  value?: string
  onChange?: (v: string) => void
  required?: boolean
  name?: string
  className?: string
}

export default function ZipInput({ value = "", onChange = () => {}, required = false, name, className }: Props) {
  return (
    <div>
      <Input
        className={className}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const digits = e.target.value.replace(/\D/g, "")
          onChange(digits.slice(0, 4))
        }}
        inputMode="numeric"
        maxLength={4}
        required={required}
        name={name}
      />
    </div>
  )
}
