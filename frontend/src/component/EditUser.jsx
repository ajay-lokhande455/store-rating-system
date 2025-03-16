import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditUser = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    role: user?.role || "user",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    try {
      // dispatch(updateUser(formData));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-2 focus:ring-2 focus:ring-gray-500"
            >
              <option value="user">User</option>
              <option value="store_owner">Store Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <h3 className="text-lg font-semibold mt-4">Change Password</h3>

          <div>
            <label className="text-gray-600 text-sm">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border p-2 focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full p-2 hover:bg-gray-800"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
