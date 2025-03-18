import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
          <div>
            <h2 className="text-lg font-bold text-white">Store Rating</h2>
            <p className="mt-2 text-gray-400">
              Your trusted platform for quality products and services.
            </p>
          </div>

          
          <div>
            <h2 className="text-lg font-bold text-white">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Contact Us</h2>
            <ul className="mt-2 space-y-2">
              <li>Email: ajaylokhande@Store.com</li>
              <li>Phone: +91 7499385295</li>
              <li>Address: 123 Main Street, City, Country</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <Link to="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-500">© 2025 Ajay Lokhande. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
