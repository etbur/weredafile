import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from '../assets/img/images.jpg'; // Ensure this path is correct

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    await dispatch(signup({ name, email, password }));
    navigate("/login");
  };

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-white">
      <div className="text-center">
        <img src={logo} alt="Logo" className="mx-auto mb-4" style={{ width: '100px', height: '100px' }} />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="mt-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Full Name</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:ring focus:ring-green-500 focus:border-green-500" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        
        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:ring focus:ring-green-500 focus:border-green-500" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        {/* Password */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full p-2 border border-gray-300 rounded text-gray-900 bg-white focus:ring focus:ring-green-500 focus:border-green-500" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <span 
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Sign Up</button>
      </form>

      <p className="mt-4 text-center text-gray-700">
        Already have an account? <Link to="/login" className="text-green-600">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
