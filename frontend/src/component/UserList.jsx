import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        Object.values(user).join(" ").toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  return (
    <div className="overflow-x-auto md:px-10">
      <h2 className="text-2xl font-bold m-4">Users</h2>

      <input
        type="text"
        placeholder="Search by Name, Email, Address, or Role..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      <div className="bg-white shadow-md p-4">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 truncate max-w-xs">{user.name}</td>
                  <td className="p-2 truncate max-w-xs">{user.email}</td>
                  <td className="p-2 truncate max-w-xs">{user.address}</td>
                  <td className="p-2 truncate max-w-xs">{user.id}</td>
                  <td className="p-2 truncate max-w-xs">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
