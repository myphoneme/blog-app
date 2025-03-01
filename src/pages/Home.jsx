import React from "react";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen font-serif flex flex-col justify-between ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#f2efe6] text-black"
      }`}
    >
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center pt-32 px-6">
        <h2
          className={`text-6xl font-bold leading-tight ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Human stories & ideas
        </h2>
        <p
          className={`text-xl mt-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          A place to read, write, and deepen your understanding
        </p>
        <button className="mt-6 bg-[#FF6B00] text-white px-6 py-3 rounded-full text-lg hover:bg-[#E65D00] transition-colors duration-200">
          Start reading
        </button>
      </section>

      {/* Footer */}
      <footer
        className={`text-center p-6 mt-auto border-t ${
          isDarkMode
            ? "text-gray-400 border-gray-700"
            : "text-gray-600 border-gray-300"
        }`}
      >
        <p>
          Help &middot; Status &middot; About &middot; Careers &middot; Press
          &middot; Blog &middot; Privacy &middot; Terms
        </p>
      </footer>
    </div>
  );
};

export default Home;
