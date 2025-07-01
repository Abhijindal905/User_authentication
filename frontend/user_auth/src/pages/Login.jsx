import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      const username = response.data.username;
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', username)
      alert('Login Successful');
      navigate('/dashboard');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Login Failed';
      setFormError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {formError && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-center text-sm">
            {formError}
          </div>
        )}

        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter Username"
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
