import React from 'react'

function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <form method="post" action="submit" className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text"
          name="name"
          id="name"
          placeholder="Enter Name"
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
        />
        <input
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="password"
          name="password"
          id="pass"
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
