type Props = {
  value?: string
  onChange?: (v: string) => void
  required?: boolean
  name?: string
  className?: string
}

export default function SelectMajor({ value = "", onChange = () => {}, required = false, name, className }: Props) {
  const options = [
    { value: "", label: "Válassz szakot" },
    { value: "informatika", label: "Informatika" },
    { value: "gazdasag", label: "Gazdaság" },
    { value: "muveszet", label: "Művészet" },
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
        <option key={o.value} value={o.value} className="text-md">
          {o.label}
        </option>
      ))}
    </select>
  )
}
