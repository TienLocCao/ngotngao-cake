type Props = {
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false
}: Props) {
  return (
    <div className="mb-3">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 h-10"
        disabled={disabled}
      />
    </div>
  );
}
