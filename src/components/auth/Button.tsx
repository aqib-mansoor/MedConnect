interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit";
  className?: string; // <-- Add this line
}

export default function Button({ text, onClick, type = "button", className = "" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition ${className}`} // merge default + custom classes
    >
      {text}
    </button>
  );
}
