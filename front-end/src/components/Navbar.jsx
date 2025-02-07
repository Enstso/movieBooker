import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Vérifier si l'utilisateur est authentifié (exemple avec localStorage)
  const isAuthenticated = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Suppression du access_token
    navigate("/login"); // Redirection vers la page de connexion
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          🎬 MovieApp
        </Link>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex gap-6">
          <NavLink 
            to="/movies" 
            className={({ isActive }) => `hover:text-gray-300 ${isActive ? "underline font-bold" : ""}`}
          >
            Movies
          </NavLink>

          {isAuthenticated ? (
            <Button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </Button>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => `hover:text-gray-300 ${isActive ? "underline font-bold" : ""}`}
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => `hover:text-gray-300 ${isActive ? "underline font-bold" : ""}`}
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Menu Burger (Mobile) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
          ☰
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-blue-700 p-4">
          <NavLink to="/movies" className="py-2" onClick={() => setIsOpen(false)}>
            Movies
          </NavLink>

          {isAuthenticated ? (
            <button onClick={handleLogout} className="py-2 text-red-400">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="py-2" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className="py-2" onClick={() => setIsOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
