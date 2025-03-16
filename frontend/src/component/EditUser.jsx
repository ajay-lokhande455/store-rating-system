import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, updatePassword } from "../features/userSlice";
import { toast } from "react-toastify";

const EditUser = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    role: "user",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        role: user.role || "user",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user.id, userData: formData }));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }
    dispatch(updatePassword({ oldPassword: formData.oldPassword, newPassword: formData.newPassword }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-2" />
          <button type="submit" className="bg-black text-white w-full p-2 hover:bg-gray-800">Update Profile</button>
        </form>
        
        <h3 className="text-lg font-semibold mt-4">Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} placeholder="Old Password" className="w-full border p-2" />
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="New Password" className="w-full border p-2" />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full border p-2" />
          <button type="submit" className="bg-black text-white w-full p-2 hover:bg-gray-800">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
