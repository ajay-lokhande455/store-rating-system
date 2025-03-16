import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white  p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <label className="text-gray-500 text-sm">User ID</label>
            <p className="text-lg font-medium">{user?._id}</p>
          </div>

          <div className="border-b pb-2">
            <label className="text-gray-500 text-sm">Name</label>
            <p className="text-lg font-medium">{user?.name}</p>
          </div>

          <div className="border-b pb-2">
            <label className="text-gray-500 text-sm">Email</label>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>

          <div className="border-b pb-2">
            <label className="text-gray-500 text-sm">Role</label>
            <p className="text-lg font-medium capitalize">{user?.role}</p>
          </div>

          <div className="border-b pb-2">
            <label className="text-gray-500 text-sm">Address</label>
            <p className="text-lg font-medium">{user?.address}</p>
          </div>

          <div>
            <label className="text-gray-500 text-sm">Joined On</label>
            <p className="text-lg font-medium">{new Date(user?.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
