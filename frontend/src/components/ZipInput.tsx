import * as React from "react"
import { Input } from "@/components/ui/input"

export function ZipInput() {
  // React state to store the input value
  const [value, setValue] = React.useState("")

  return (
    <div className="flex flex-col gap-2">
      <Input
        id="code"
        type="text"           // use text, not number
        inputMode="numeric"   // shows numeric keyboard on mobile
        pattern="[0-9]*"      // only digits allowed
        maxLength={4}         // limit to 4 digits
        value={value}
        onChange={(e) => {
          const digitsOnly = e.target.value.replace(/\D/g, "")
          setValue(digitsOnly)
        }}
      />
    </div>
  )
}
