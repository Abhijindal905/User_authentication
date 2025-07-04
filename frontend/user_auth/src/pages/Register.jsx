import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register() {

  const navigate = useNavigate();

  const [formErrorData, setFormErrorData] = useState('')
  const [formData, setFormData] = useState({
    'username': '',
    'email': '',
    'password': ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value 
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      console.log(response)
      alert('Registration Successful')
      navigate('/login')
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Registration Failed';
      setFormErrorData(errorMsg)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        {formErrorData && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-center text-sm">
            {formErrorData}
          </div>
        )}
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter Username"
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="password"
          name="password"
          id="pass"
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
  )
}

export default Register
