interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string; // ✅ Add this line
}

export default function InputField({ label, type = "text", value, onChange, className = "" }: InputProps) {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label className="mb-1 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
