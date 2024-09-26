import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', data);
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('id', response.data.user._id);

        toast.success('Login successful');
        
        navigate('/userprofile');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Network error');
      }
    }
  };

  return (
    <>
          <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <form onSubmit={handleSubmit} class="space-y-4">
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
            <div className="input-group">
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md "
                onChange={handleChange}
                name="email"
                placeholder="Email"
                value={data.email}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md "
                onChange={handleChange}
                name="password"
                placeholder="Password"
                value={data.password}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md "
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
