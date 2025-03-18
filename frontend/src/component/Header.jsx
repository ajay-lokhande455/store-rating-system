import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaPager,
  FaBars,
  FaTimes,
  FaStore,
  FaUsers,
} from "react-icons/fa";
import Login from "../component/Login";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { searchStores } from "../features/storeSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "../component/SignUp";

const Header = () => {
  const [modal, setModal] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchDropdownRef = useRef(null);
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    setDropdownOpen(false);
    navigate("/");
    setMobileMenuOpen(false);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const results = await dispatch(searchStores(query));
      setSearchResults(results.payload || []);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectStore = (storeId) => {
    navigate(`/rating/${storeId}`);
    setSearchQuery("");
    setSearchResults([]);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 px-10 bg-white border-b border-gray-200 relative">
      <div className="text-3xl font-bold ">
        <Link to="/">Store</Link>
      </div>

      <button
        className="md:hidden text-2xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Search Bar (Desktop) */}
      <div className="relative w-96 hidden md:block" ref={searchDropdownRef}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search store with name and address..."
          className="w-full p-2 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        {searchResults.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-300 mt-1 shadow-lg z-50">
            {searchResults.map((store) => (
              <li
                key={store.id}
                onClick={() => handleSelectStore(store.id)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                <Link
                  to={`/rating/${store.id}`}
                  className="block w-full h-full"
                >
                  {store.name} - {store.address}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="hidden md:flex items-center gap-10">
        <ul className="flex gap-10 text-gray-500 text-sm">
          <li className="hover:text-black cursor-pointer">
            <Link to="/">HOME</Link>
          </li>
          <li className="hover:text-black cursor-pointer">
            <Link to="/stores">STORES</Link>
          </li>
          <li className="hover:text-black cursor-pointer">
            <Link to="/contact">CONTACT</Link>
          </li>
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
                {user.role === "admin" && (
                  <Link
                    to="/adminPage"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaPager className="text-gray-500" />
                    Admin Page
                  </Link>
                )}

                {user.role === "store_owner" && (
                  <Link
                    to="/storeRatings"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaPager className="text-gray-500" />
                    Your Store
                  </Link>
                )}

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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 z-40 left-0 w-full bg-white shadow-md p-4 md:hidden">
          {/* Mobile Search Bar */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-3/4 p-2 pl-8 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
            />
            <FaSearch className="absolute left-2 top-3 text-gray-400 text-sm" />

            {searchResults.length > 0 && (
              <ul className="absolute w-3/4 bg-white border border-gray-300 mt-1 shadow-lg z-50">
                {searchResults.map((store) => (
                  <li
                    key={store.id}
                    onClick={() => handleSelectStore(store.id)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    <Link
                      to={`/rating/${store.id}`}
                      className="block w-full h-full"
                    >
                      {store.name} - {store.address}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="flex flex-col gap-4 text-gray-500 text-sm">
            <li className="hover:text-black cursor-pointer">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                HOME
              </Link>
            </li>
            <li className="hover:text-black cursor-pointer">
              <Link to="/stores" onClick={() => setMobileMenuOpen(false)}>
                STORES
              </Link>
            </li>
            <li className="hover:text-black cursor-pointer">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                CONTACT
              </Link>
            </li>

            {token ? (
              <>
                <li className="hover:text-black cursor-pointer">
                  <Link
                    to="/my-account"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUser className="text-gray-500 inline-block mr-2" />
                    Hi, {user.name}
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li className="hover:text-black cursor-pointer">
                    <Link
                      to="/adminPage"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaStore className="text-gray-500 inline-block mr-2" />{" "}
                      Stores
                    </Link>
                  </li>
                )}
                {user.role === "store_owner" && (
                  <li className="hover:text-black cursor-pointer">
                    <Link
                      to="/storeRatings"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaStore className="text-gray-500 inline-block mr-2" />{" "}
                      Your Store
                    </Link>
                  </li>
                )}
                {user.role === "admin" && (
                  <li>
                  <Link to="/allUsers" onClick={() => setMobileMenuOpen(false)}>
                    <FaUsers className="text-gray-500 inline-block mr-2" />{" "}
                    Users
                  </Link>
                </li>)}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-left w-full px-1 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="text-gray-500" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="bg-black text-white px-6 py-2 font-semibold hover:bg-gray-800"
                  onClick={() => setModal("login")}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {modal === "login" && (
        <Login
          onClose={() => setModal(null)}
          onSignup={() => setModal("signup")}
        />
      )}
      {modal === "signup" && (
        <Signup
          onClose={() => setModal(null)}
          onLogin={() => setModal("login")}
        />
      )}
    </header>
  );
};

export default Header;
