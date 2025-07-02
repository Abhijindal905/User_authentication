import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const access = localStorage.getItem('access');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  let navLinks;

  if (access) {
    // User is logged in
    navLinks = (
      <>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <span className="ml-4 text-sm bg-white text-indigo-600 px-3 py-1 rounded-full">
          👋 {username}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-400 px-3 py-1 rounded hover:bg-red-600 text-white ml-2"
        >
          Logout
        </button>
      </>
    );
  } else {
    // User is NOT logged in
    navLinks = (
      <>
        <Link to="/" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </>
    );
  }

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <div className="space-x-4 flex items-center">
        {navLinks}
      </div>
    </nav>
  );
}

export default Navbar;
