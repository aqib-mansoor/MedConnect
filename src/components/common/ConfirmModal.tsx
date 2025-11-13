import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-md transform transition-all scale-95 animate-scaleIn">
        <div className="flex flex-col items-center gap-4">
          <div className="text-red-500 text-4xl">
            <FaExclamationTriangle />
          </div>
          <p className="text-center text-lg font-semibold text-gray-800">{message}</p>
          <div className="flex gap-4 mt-4 w-full">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
