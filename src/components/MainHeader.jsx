import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import SignInModal from "./Signin";

const MainHeader = ({ isLoggedIn }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const profileOptions = [
    { label: "Write", icon: "✍️", action: () => navigate("/write") },
    { label: "Profile", icon: "👤", action: () => navigate("/profile") },
    { label: "Library", icon: "📚", action: () => navigate("/library") },
    { label: "Stories", icon: "📝", action: () => navigate("/stories") },
    { label: "Stats", icon: "📊", action: () => navigate("/stats") },
    { label: "Settings", icon: "⚙️", action: () => navigate("/settings") },
    { label: "Help", icon: "❓", action: () => navigate("/help") },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleWriteArticle = () => {
    if (isLoggedIn) {
      navigate("/write");
    } else {
      setModalOpen(true);
    }
  };

  // Determine if we're on the home page
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${
        isDarkMode
          ? "bg-gray-900 text-white"
          : isHomePage
          ? "bg-[#f2efe6]"
          : "bg-white text-gray-800"
      } shadow transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="http://myphoneme.com/assets/img/logopng.png"
            alt="Phoneme logo"
            className="w-24 h-auto"
          />
        </Link>

        {isLoggedIn ? (
          <>
            {/* Search Bar - Only show on logged-in state */}
            <form
              onSubmit={handleSearch}
              className="flex-grow mx-8 max-w-2xl relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className={`w-full px-4 py-2 pr-10 border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                } rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-sm transition-colors duration-200`}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Right Side Icons for Logged In Users */}
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                } transition-colors duration-200`}
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Write Article Button */}
              <button
                onClick={handleWriteArticle}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FF6B00] hover:bg-[#E65D00] text-white transition-colors duration-200`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span className="hidden sm:inline">Write</span>
              </button>

              {/* Profile Picture with Dropdown */}
              <div className="relative">
                <button
                  className={`text-current hover:opacity-80 transition-opacity duration-200`}
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center text-white font-bold transition-colors duration-200`}
                  >
                    A
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-56 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } rounded-lg shadow-lg border z-50 transition-colors duration-200`}
                  >
                    <ul className="py-2">
                      {profileOptions.map((option, index) => (
                        <li key={index}>
                          <button
                            onClick={() => {
                              option.action();
                              setIsProfileDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm ${
                              isDarkMode
                                ? "text-gray-300 hover:bg-gray-700"
                                : "text-gray-700 hover:bg-gray-100"
                            } transition-colors duration-200 flex items-center space-x-2`}
                          >
                            <span>{option.icon}</span>
                            <span>{option.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Navigation for Logged Out Users */
          <nav className="flex items-center space-x-6 text-sm">
            <Link to="/our-story" className="hover:underline">
              Our story
            </Link>
            <Link to="/membership" className="hover:underline">
              Membership
            </Link>
            <button onClick={handleWriteArticle} className="hover:underline">
              Write
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="hover:underline"
            >
              Sign in
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              } transition-colors duration-200`}
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#FF6B00] text-white px-4 py-2 rounded-full hover:bg-[#E65D00] transition-colors duration-200"
            >
              Get started
            </button>
          </nav>
        )}
      </div>

      {/* Sign In Modal */}
      <SignInModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};

export default MainHeader;
