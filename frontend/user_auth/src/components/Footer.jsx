import React from 'react';

function Footer() {
  const access = localStorage.getItem('access');
  const email = localStorage.getItem('email'); // 👈 get email if stored

  return (
    <footer className="bg-gray-100 text-center text-gray-600 py-4 mt-auto">
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      {access && email && (
        <p className="text-sm mt-1">Logged in as: <strong>{email}</strong></p>
      )}
    </footer>
  );
}

export default Footer;
