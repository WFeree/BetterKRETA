type Props = {
  value?: string
  onChange?: (v: string) => void
  required?: boolean
  name?: string
  className?: string
}

export default function SelectType({ value = "", onChange = () => {}, required = false, name, className }: Props) {
  const options = [
    { value: "", label: "Válassz jelleget" },
    { value: "utca", label: "utca" },
    { value: "ter", label: "tér" },
    { value: "setany", label: "sétány" },
    { value: "koz", label: "köz" },
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
