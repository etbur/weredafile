import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../actions/authActions";
import { Link } from "react-router-dom";
import forgot from '../assets/img/forgot.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const forgotPasswordResponse = useSelector((state) => state.auth.forgotPasswordResponse);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
    setMessage(forgotPasswordResponse?.message || "If this email is registered, you'll receive a reset link.");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-white">
      <div className="text-center">
        <img src={forgot} alt="forgot" className="mx-auto mb-4" style={{ width: '100px', height: '100px' }} />
      </div>
      {message && <p className="text-green-600 text-center">{message}</p>}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-black">Email</label> {/* Text color changed to black */}
          <input 
            type="email" 
            className="w-full p-2 border rounded text-black" // Text color changed to black
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Submit</button>
      </form>
      <p className="mt-4 text-center text-black"> {/* Text color changed to black */}
        Remembered your password? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;