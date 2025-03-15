import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Login from "./Login";
import Signup from "./Signup";

const Header = () => {
  const [modal, setModal] = useState(null); 

  return (
    <header className="flex justify-between items-center p-4 px-10 bg-white border-b border-gray-200 relative">
      <div className="text-3xl font-bold underline">
        <Link to="/">Store</Link>
      </div>

      <div className="relative w-96">
        <input
          type="text"
          placeholder="Search store with name and address..."
          className="w-full p-2 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <nav className="flex items-center gap-10">
        <ul className="flex gap-10 text-gray-500 text-sm">
          <li className="hover:text-black cursor-pointer"><Link to="/stores">STORES</Link></li>
          <li className="hover:text-black cursor-pointer"><Link to="/rating">RATING</Link></li>
          <li className="hover:text-black cursor-pointer"><Link to="/contact">CONTACT</Link></li>
        </ul>

        <button 
          className="bg-black text-white px-6 py-2 font-semibold hover:bg-gray-800"
          onClick={() => setModal("login")} 
        >
          Login
        </button>
      </nav>

      {modal === "login" && <Login onClose={() => setModal(null)} onSignup={() => setModal("signup")} />}
      {modal === "signup" && <Signup onClose={() => setModal(null)} />}
    </header>
  );
};

export default Header;
