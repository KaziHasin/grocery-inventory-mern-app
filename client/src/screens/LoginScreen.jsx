import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
const LoginScreen = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const requestConfig = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      };

      const res = await fetch(`${BASE_URL}/auth/login`, requestConfig);
      const data = await res.json();
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      if (!res.ok) {
        setLoading(false);
        throw new Error('Server Error', data);
      }

      navigate('/');

    } catch (error) {
      console.log(error.message);
      toast.error("error");
      setLoading(false);

    } finally {
      setLoading(false);
    }
  };


  return (
    <FormContainer heading={"Sign In"}>
      <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            value={formData.email}
            required=""
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start"></div>
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-red-500"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {loading ? <Loader className="text-center" /> : ' Sign in'}
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
          Don’t have an account yet?&nbsp;
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-700"
          >
            Sign up
          </Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default LoginScreen;
