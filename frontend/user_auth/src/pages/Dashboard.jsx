import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        }
      });
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome, {username || "Guest"}!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-700">📊 Stats</h2>
            <p className="text-gray-700 mt-2">
              You can add user stats or activity summary here.
            </p>
          </div>
          <div className="bg-green-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-700">
              📝 Quick Actions
            </h2>
            <p className="text-gray-700 mt-2">
              Place shortcuts or links to features here.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('username')
              navigate("/login");
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
