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
          isDarkMode ? "bg-gray-900/80" : "bg-white"
        } p-6 rounded-lg border ${
          isDarkMode ? "border-gray-800/60" : "border-gray-100"
        } transition-all duration-200`}
      >
        <div
          className={`h-6 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          } rounded w-1/3 mb-4 animate-pulse`}
        ></div>
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div
                className={`h-4 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                } rounded w-3/4 mb-2`}
              ></div>
              <div
                className={`h-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
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
        isDarkMode ? "bg-gray-900/80" : "bg-white"
      } p-6 rounded-lg border ${
        isDarkMode ? "border-gray-800/60" : "border-gray-100"
      } transition-all duration-200`}
    >
      <h3
        className={`text-lg font-bold ${
          isDarkMode ? "text-white" : "text-gray-900"
        } mb-1`}
      >
        Staff Picks
      </h3>
      <p
        className={`text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        } mb-4`}
      >
        Curated by our editors
      </p>
      <div className="mt-4 space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className={`block -mx-2 px-2 py-2 rounded-lg transition-all duration-200 group ${
              isDarkMode ? "hover:bg-gray-800/80" : "hover:bg-gray-50"
            }`}
          >
            <h4
              className={`text-sm font-semibold ${
                isDarkMode ? "text-gray-100" : "text-gray-700"
              } line-clamp-2 group-hover:text-[#FF6B00] transition-colors duration-200`}
            >
              {article.title}
            </h4>
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
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
