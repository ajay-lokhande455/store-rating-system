import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../features/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  const [err, setErr] = useState("");
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const { name, email, password, address } = formData;

    if (name.length < 3 || name.length > 20) {
      return "Name must be between 3 and 20 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email format.";
    }
    if (
      password.length < 6 ||
      password.length > 16 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      return "Password must be 6-16 characters long, include at least one uppercase letter and one special character.";
    }
    if (address.length > 400) {
      return "Address must be a maximum of 400 characters.";
    }

    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErr(validationError);
      toast.error(validationError);
      return;
    }

    try {
      await dispatch(signup(formData)).unwrap();
      onClose();
      toast.success("Signup successful! Please log in to your account");
    } catch (error) {
      setErr(error);
      toast.error("Signup failed! " + error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="w-full max-w-md bg-white p-6 relative">
        {onClose && (
          <button
            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✖
          </button>
        )}

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        {err && <p className="text-red-500 text-center mt-2">{err}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-black"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 hover:bg-gray-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
