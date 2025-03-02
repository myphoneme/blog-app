import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaFacebook, FaEnvelope } from "react-icons/fa";

const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#4285F4"
      d="M44.5 20H24v8.5h11.7C34.3 34 30 38 24 38c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.5 0 6.6 1.3 9 3.4l6-6C34.4 3.5 29.5 1 24 1 11.3 1 1 11.3 1 24s10.3 23 23 23c11.5 0 21-8.3 21-21 0-1.3-.1-2.7-.5-4z"
    />
    <path
      fill="#34A853"
      d="M6.3 14.7l6.6 4.8C15.3 16.7 19.4 14 24 14c3.5 0 6.6 1.3 9 3.4l6-6C34.4 7.5 29.5 5 24 5 15.4 5 8.1 10.1 6.3 14.7z"
    />
    <path
      fill="#FBBC05"
      d="M24 43c6.1 0 11.6-2.1 15.8-5.6l-7.3-5.7c-2.3 1.6-5.2 2.6-8.5 2.6-5.4 0-10.1-3.5-11.8-8.4l-6.8 5.2C9.1 38.1 16 43 24 43z"
    />
    <path
      fill="#EA4335"
      d="M43 24c0-1.3-.1-2.7-.5-4H24v8.5h11.7C34.3 34 30 38 24 38c-7.7 0-14-6.3-14-14 0-2.4.6-4.6 1.7-6.6l-6.8-5.2C2.6 16 1 19.8 1 24c0 12.7 10.3 23 23 23 11.5 0 21-8.3 21-21z"
    />
  </svg>
);

const SignInModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("signin");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append("username", formData.email);
      formBody.append("password", formData.password);

      const response = await fetch("http://fastapi.phoneme.in/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: formBody,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        onClose();
        navigate("/articles");
      } else {
        setError(
          typeof data.detail === "string" ? data.detail : "Invalid credentials"
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://fastapi.phoneme.in/users", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const signInBody = new URLSearchParams();
        signInBody.append("username", formData.email);
        signInBody.append("password", formData.password);

        const loginResponse = await fetch("http://fastapi.phoneme.in/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
          body: signInBody,
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem("token", loginData.access_token);
          onClose();
          navigate("/articles");
        } else {
          setError(
            "Registration successful but couldn't sign in automatically. Please sign in manually."
          );
        }
      } else {
        setError(data.detail || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`relative ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg shadow-xl w-full max-w-sm mx-4 z-10`}
      >
        {/* Close Button */}
        <button
          className={`absolute top-3 right-3 ${
            isDarkMode
              ? "text-gray-400 hover:text-gray-300"
              : "text-gray-600 hover:text-gray-800"
          } text-xl font-bold`}
          onClick={onClose}
        >
          ×
        </button>

        {/* Logo and Slogan */}
        <div className="text-center mb-6">
          <img
            src="http://myphoneme.com/assets/img/logopng.png"
            alt="Phoneme logo"
            className="w-24 h-auto mx-auto mb-2"
          />
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Share your stories with the world
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex mb-4 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "signin"
                ? "text-[#FF6B00] border-b-2 border-[#FF6B00]"
                : isDarkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "signup"
                ? "text-[#FF6B00] border-b-2 border-[#FF6B00]"
                : isDarkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={`mb-4 p-2 ${
              isDarkMode
                ? "bg-red-900/50 text-red-300"
                : "bg-red-100 text-red-600"
            } text-xs rounded`}
          >
            {error}
          </div>
        )}

        {/* Sign In Form */}
        {activeTab === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-3">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B00]`}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B00]`}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF6B00] text-white py-2 rounded-md text-sm font-medium hover:bg-[#E65D00] transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-3">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B00]`}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B00]`}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B00]`}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF6B00] text-white py-2 rounded-md text-sm font-medium hover:bg-[#E65D00] transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        {/* Terms and Privacy */}
        <p
          className={`text-xs text-center mt-4 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          By signing up, you agree to our{" "}
          <a href="#" className="underline hover:text-[#FF6B00]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-[#FF6B00]">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default SignInModal;
