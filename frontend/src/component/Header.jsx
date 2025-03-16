import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { searchStores } from "../features/storeSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [modal, setModal] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { stores, loading } = useSelector((state) => state.stores);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    setDropdownOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length > 0) {
      dispatch(searchStores(value));
    }
  };

  return (
    <header className="flex justify-between items-center p-4 px-10 bg-white border-b border-gray-200 relative">
      <div className="text-3xl font-bold underline">
        <Link to="/">Store</Link>
      </div>

      {/* Search Input */}
      <div className="relative w-96">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search store with name and address..."
          className="w-full p-2 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        {/* Search Results Dropdown */}
        {query && (
          <div className="absolute w-full bg-white border border-gray-300 mt-1 z-50 shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <p className="p-2 text-gray-500">Searching...</p>
            ) : stores.length > 0 ? (
              stores.map((store) => (
                <Link
                  key={store.id}
                  to={`/rating/${store.id}`}
                  className="block p-2 hover:bg-gray-100"
                  onClick={() => setQuery("")}
                >
                  {store.name}
                </Link>
              ))
            ) : (
              <p className="p-2 text-gray-500">No stores found</p>
            )}
          </div>
        )}
      </div>

      <nav className="flex items-center gap-10">
        <ul className="flex gap-10 text-gray-500 text-sm">
          <li className="hover:text-black cursor-pointer"><Link to="/stores">STORES</Link></li>
          <li className="hover:text-black cursor-pointer"><Link to="/contact">CONTACT</Link></li>
        </ul>

        {token ? (
          <div className="relative">
            <p 
              className="text-lg font-medium cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Hi, {user?.name}
            </p>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 z-50 bg-white shadow-lg border border-gray-200">
                <Link
                  to="/my-account"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaUser className="text-gray-500" /> My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="text-gray-500" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="bg-black text-white px-6 py-2 font-semibold hover:bg-gray-800"
            onClick={() => setModal("login")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
