import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const storedToken = localStorage.getItem("resetToken");
    if (token === storedToken) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser.password = password;
      localStorage.setItem("user", JSON.stringify(storedUser));
      localStorage.removeItem("resetToken");
      toast.success("Password has been reset successfully.");
      navigate("/login");
    } else {
      toast.error("Invalid or expired reset token.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">New Password</label>
          <input 
            type="password" 
            className="w-full p-2 border rounded" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Confirm Password</label>
          <input 
            type="password" 
            className="w-full p-2 border rounded" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;