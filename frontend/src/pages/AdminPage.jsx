import React, { useState, useEffect } from "react";
import { FaStore, FaUsers, FaSignOutAlt, FaBars, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { toast } from "react-toastify";
import { fetchStores, createStore } from "../features/storeSlice";
import { fetchAllUsers } from "../features/userSlice";
import UserList from "../component/UserList";
import StoreList from "../component/StoreList";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stores, loading } = useSelector((state) => state.stores);
  const { users } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("stores");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    image: "",
    address: "",
    owner_id: "",
    rating: "",
  });

  useEffect(() => {
    dispatch(fetchStores());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/")
  };

  const filteredData = (data) =>
    data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  const handleCreateStore = (e) => {
    e.preventDefault();
    if (!newStore.name || !newStore.email || !newStore.image || !newStore.address || !newStore.owner_id) {
      toast.error("All fields are required!");
      return;
    }
    dispatch(createStore(newStore));
    if (!loading) toast.success("Store created successfully!");
    setNewStore({ name: "", email: "", image: "", address: "", owner_id: "", rating: "" });
    setShowCreateForm(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      <aside className={`relative ${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-md transition-all  md:h-full z-50 md:block  ${sidebarOpen ? "block" : "hidden"}`}>

        <div className="flex justify-between items-center p-4 border-b">
          {sidebarOpen && <h2 className="text-lg font-bold">Admin Panel</h2>}
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <button onClick={() => setSelectedTab("stores")} className={`flex items-center gap-2 p-2 ${selectedTab === "stores" ? "bg-gray-200" : ""}`}>
            <FaStore /> {sidebarOpen && "Stores"}
          </button>
          <button onClick={() => setSelectedTab("users")} className={`flex items-center gap-2 p-2 ${selectedTab === "users" ? "bg-gray-200" : ""}`}>
            <FaUsers /> {sidebarOpen && "Users"}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 p-2 text-red-600">
            <FaSignOutAlt /> {sidebarOpen && "Logout"}
          </button>
        </nav>
      </aside>

  
      <main className="flex-1 p-6 mt-16  md:mt-0 m">
 
        <input
          type="text"
          placeholder="Search by Name, Email, Address, or Role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        {selectedTab === "stores" && (
          <button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 mb-4 rounded-md">
            <FaPlus /> Create Store
          </button>
        )}

        {showCreateForm && selectedTab === "stores" && (
          <form onSubmit={handleCreateStore} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-2">Create New Store</h2>
            <input type="text" placeholder="Store Name" value={newStore.name} onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} className="w-full p-2 mb-2 border border-gray-300 rounded-md" />
            <input type="email" placeholder="Store Email" value={newStore.email} onChange={(e) => setNewStore({ ...newStore, email: e.target.value })} className="w-full p-2 mb-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Store Image URL" value={newStore.image} onChange={(e) => setNewStore({ ...newStore, image: e.target.value })} className="w-full p-2 mb-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Store Address" value={newStore.address} onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} className="w-full p-2 mb-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Owner ID" value={newStore.owner_id} onChange={(e) => setNewStore({ ...newStore, owner_id: e.target.value })} className="w-full p-2 mb-2 border border-gray-300 rounded-md" />
            <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Add Store</button>
          </form>
        )}

  
        {selectedTab === "stores" ? <StoreList stores={filteredData(stores)} /> : <UserList users={filteredData(users)} />}
      </main>
    </div>
  );
};

export default AdminPage;
