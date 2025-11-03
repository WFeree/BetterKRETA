type Props = {
  value?: string
  onChange?: (v: string) => void
  required?: boolean
  name?: string
  className?: string,
}

export default function SelectClass({ value = "", onChange = () => {}, required = false, name, className }: Props) {
  const options = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },

  ]

  return (
    <select
      className={`w-full rounded-md border px-3 py-2 ${className ?? ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      name={name}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
