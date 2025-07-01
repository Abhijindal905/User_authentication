import React, { useState } from 'react'
import axios from 'axios'
function Register() {

  const [formData, setFormData] = useState({
    'name': '',
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
    } catch (error) {
      console.error('Error: ', error.response?.data || error.message);
      alert('Registration Failed');
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
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
