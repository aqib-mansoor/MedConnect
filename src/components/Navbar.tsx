import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl text-blue-600">MedConnect</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="font-medium">{user.name} ({user.role})</span>
          <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </nav>
  );
}
