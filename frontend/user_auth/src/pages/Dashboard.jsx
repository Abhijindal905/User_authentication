import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome, {username || 'Guest'}!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-700">📊 Stats</h2>
            <p className="text-gray-700 mt-2">You can add user stats or activity summary here.</p>
          </div>
          <div className="bg-green-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-700">📝 Quick Actions</h2>
            <p className="text-gray-700 mt-2">Place shortcuts or links to features here.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              navigate('/login')
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
