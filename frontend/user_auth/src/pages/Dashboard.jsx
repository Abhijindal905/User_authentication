import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const access = localStorage.getItem("access");
        const response = await axios.get("http://127.0.0.1:8000/api/dashboard/", {
          headers: { Authorization: `Bearer ${access}` },
        });

        setUserData(response.data); // store user data
      } catch (err) {
        if (err.response?.status === 401) {
          setErrorMessage("Access token expired. Attempting to refresh...");
          const refresh = localStorage.getItem("refresh");
          if (refresh) {
            try {
              const tokenres = await axios.post(
                "http://127.0.0.1:8000/api/token/refresh/",
                { refresh } // must be POST with JSON body
              );
              const newAccess = tokenres.data.access;
              localStorage.setItem("access", newAccess);

              const newResponse = await axios.get("http://127.0.0.1:8000/api/dashboard/", {
                headers: { Authorization: `Bearer ${newAccess}` },
              });

              setUserData(newResponse.data);
            } catch (refreshErr) {
              setErrorMessage("Session expired. Please login again.");
              localStorage.clear();
              navigate("/login");
            }
          } else {
            setErrorMessage("Session expired. Please login again.");
            localStorage.clear();
            navigate("/login");
          }
        } else {
          console.log(err);
        }
      }
    };
    fetchDashboard();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        {errorMessage && (
          <div className="mb-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded">
            {errorMessage}
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome, {userData?.username || "Guest"}!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blue-700">📊 Stats</h2>
            <p className="text-gray-700 mt-2">Email: {userData?.email}</p>
            <p className="text-gray-700 mt-2">
              Tasks Completed: {userData?.task_completed ?? "N/A"}
            </p>
          </div>

          <div className="bg-green-100 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-700">
              📝 Recent Actions
            </h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {userData?.recent_actions?.map((action, idx) => (
                <li key={idx}>{action}</li>
              )) || <li>{ userData?.actions }</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
