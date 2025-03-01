import React from "react";

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="container mx-auto px-4 py-4 border-b border-gray-200">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab
                ? "text-gray-800 border-b-2 border-gray-800"
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
