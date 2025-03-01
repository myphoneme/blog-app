import React from "react";
import { Link } from "react-router-dom";
import { formatDateTime } from "../utils/helpers";
import { useTheme } from "../context/ThemeContext";

const StaffPicks = ({ articles, isLoading }) => {
  const { isDarkMode } = useTheme();

  if (isLoading) {
    return (
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg transition-colors duration-200`}
      >
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div
                className={`h-4 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                } rounded w-3/4 mb-2`}
              ></div>
              <div
                className={`h-3 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                } rounded w-1/2`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } p-6 rounded-lg transition-colors duration-200`}
    >
      <h3
        className={`text-lg font-bold ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Staff Picks
      </h3>
      <div className="mt-4 space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className={`block -mx-2 px-2 py-2 rounded-lg transition-colors duration-200 ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}
          >
            <h4
              className={`text-sm font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              } line-clamp-2`}
            >
              {article.title}
            </h4>
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              } mt-1`}
            >
              {formatDateTime(article.created_at)} · {article.created_user.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StaffPicks;
