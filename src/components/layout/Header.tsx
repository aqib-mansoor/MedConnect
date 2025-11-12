import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center w-full relative z-20">
      {/* Add left padding on mobile to avoid overlapping with sidebar toggle */}
      <h1 className="text-xl font-bold truncate pl-12 md:pl-0">MedConnect</h1>

      <div className="flex items-center gap-4">
        {user && <span className="hidden sm:inline">{user.name}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
