import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-red-600 text-white p-4 fixed w-full top-0 z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blood Bank Management</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            <li><Link to="/donor" className="hover:text-gray-300">Donor</Link></li>
            <li><Link to="/hospital" className="hover:text-gray-300">Hospital</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
