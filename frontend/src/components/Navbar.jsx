import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/icons8-note-64.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="font-bold text-2xl">Collaborative Notes</span>
        </Link>

        <div
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaTimes size={24} className="text-white" />
          ) : (
            <FaBars size={24} className="text-white" />
          )}
        </div>

        <div className="hidden lg:flex space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/notes" className="text-white">
                My Notes
              </Link>
              <Link to="/createnote" className="text-white">
                Create Note
              </Link>
              <Link
                to="/"
                className="text-white"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white">
                Signup
              </Link>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-700 p-4 space-y-4">
          {isAuthenticated ? (
            <>
              <Link to="/notes" className="text-white block">
                My Notes
              </Link>
              <Link to="/createnote" className="text-white block">
                Create Note
              </Link>
              <Link
                to="/"
                className="text-white block"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white block">
                Signup
              </Link>
              <Link to="/login" className="text-white block">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
