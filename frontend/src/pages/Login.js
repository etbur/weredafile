import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from '../assets/img/images.jpg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, number, and special character.");
      return;
    }
    await dispatch(login({ email, password }));
    navigate("/");
  };

  // Validate password strength
  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-200">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg z-20">
        {/* Logo */}
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto mb-4" style={{ width: '100px', height: '100px' }} />
        </div>

        {/* Display login error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Login Form */}
        <form className="mt-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              {/* Password Visibility Toggle */}
              <span 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye/> : <FaEyeSlash />}
              </span>
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
            Login
          </button>
        </form>

        {/* <p className="mt-4 text-center text-gray-700">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p> */}
        <p className="mt-2 text-center">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
