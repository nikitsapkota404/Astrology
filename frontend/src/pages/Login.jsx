import React, { useState, useContext } from 'react';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {AuthContext} from '../context/AuthContext.jsx'
import RingLoader from 'react-spinners/RingLoader.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()
  const {dispatch} =  useContext(AuthContext)


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (event) => {
     event.preventDefault();
     setLoading(true);
 
     try {
       const res = await fetch(`${BASE_URL}/auth/login`, {
         method: "post",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       });
 
       const result = await res.json();
       if (!res.ok) {
         throw new Error(result.message);

       }

       dispatch({
        type:'LOGIN_SUCCESS',
        payload:{
          user:result.data,
          token:result.token,
          role:result.role
        }
       })
       console.log(result, 'login data')
       setLoading(false);
       toast.success(result.message);
       navigate("/home");
     } catch (err) {
       toast.error(err.message);
       setLoading(false);
     }
   };

  return (
    <section className='min-h-screen flex items-center pt-2 justify-center bg-gradient-to-r from-indigo-400 to-purple-500 px-5 lg:px-0'>
      <div className='w-full max-w-[400px] bg-white mx-auto rounded-lg shadow-lg shadow-black md:p-10 p-6'>
        <h3 className='text-headingColor text-[25px] leading-9 font-bold mb-10 text-center'>
          Welcome Back!
        </h3>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block mb-1 text-gray-900 font-medium'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label className='block mb-1 text-gray-900 font-medium'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300'
          >
            {loading ? <RingLoader size={30} color="#facc15" /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-900 mt-6">
          Don’t have an account? <a href="./register" className="text-indigo-600 font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
