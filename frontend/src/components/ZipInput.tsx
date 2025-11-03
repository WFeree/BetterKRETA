
import * as React from "react"
import { Input } from "@/components/ui/input"

export interface ZipInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const ZipInput = React.forwardRef<HTMLInputElement, ZipInputProps>(
  ({ ...props }, ref) => {
    return <Input ref={ref} maxLength={4} min={0} max={9999} {...props} />
  }
)

ZipInput.displayName = "ZipInput"
export default ZipInput