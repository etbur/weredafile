import { useState } from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [language, setLanguage] = useState("English");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-4 sm:px-6 py-3 shadow-lg relative z-50">
      {/* Navbar Content Wrapper */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        
        {/* Row 1: Search Bar */}
        <div className="relative w-full sm:w-auto max-w-sm flex justify-center sm:justify-start">
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Row 2: Language Dropdown, Notifications, Login/Logout */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-4 sm:space-x-6 w-full sm:w-auto">
          
          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Amharic">Amharic</option>
            <option value="English">English</option>
            <option value="Oromo">Oromo</option>
            <option value="Tigrinya">Tigrinya</option>
            <option value="Afar">Afar</option>
          </select>

          {/* Notifications */}
          <div className="relative cursor-pointer">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </div>

          {/* Login/Logout */}
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center bg-gray-800 rounded-md px-3 py-2 hover:bg-gray-700 transition duration-300"
              >
                <FaUser className="mr-2 text-xl" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/"
                className="flex items-center bg-gray-800 rounded-md px-3 py-2 hover:bg-gray-700 transition duration-300"
              >
                <FaUser className="mr-2 text-xl" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
