import React, { useState } from "react";
import { FaUser, FaEdit } from "react-icons/fa";
import Profile from "../component/Profile";
import EditUser from "../component/EditUser";

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex  bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-semibold mb-6">My Account</h2>
        <ul className="space-y-4">
          <li>
            <button 
              className={`flex items-center gap-2 p-2 w-full text-left  ${activeTab === "profile" ? "bg-gray-200" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser /> My Profile
            </button>
          </li>
          <li>
            <button 
              className={`flex items-center gap-2 p-2 w-full text-left  ${activeTab === "edit" ? "bg-gray-200" : ""}`}
              onClick={() => setActiveTab("edit")}
            >
              <FaEdit /> Edit User Details
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        {activeTab === "profile" && <Profile />}
        {activeTab === "edit" && <EditUser />}
      </div>
    </div>
  );
};


export default MyAccountPage;
