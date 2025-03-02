import React from "react";
import { useTheme } from "../context/ThemeContext";

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`container mx-auto px-4 py-4`}>
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab
                ? isDarkMode
                  ? "text-white border-b-2 border-[#FF6B00]"
                  : "text-gray-800 border-b-2 border-[#FF6B00]"
                : isDarkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
