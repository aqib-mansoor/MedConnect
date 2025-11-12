interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const base = "px-6 py-2 rounded font-medium transition-colors";
  const styles = variant === "primary"
    ? "bg-blue-500 text-white hover:bg-blue-600"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";
  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
}
