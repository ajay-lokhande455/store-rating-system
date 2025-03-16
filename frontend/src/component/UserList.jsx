import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/userSlice";

const UserList = () => {
    
    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllUsers());
      }, [dispatch]);
  return (
    <div className="overflow-x-auto md:px-10">
      <h2 className="text-2xl font-bold m-4">Users</h2>
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
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2 truncate max-w-xs">{user.name}</td>
                <td className="p-2 truncate max-w-xs">{user.email}</td>
                <td className="p-2 truncate max-w-xs">{user.address}</td>
                <td className="p-2 truncate max-w-xs">{user.id}</td>
                <td className="p-2 truncate max-w-xs">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
