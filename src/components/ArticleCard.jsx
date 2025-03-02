import React from "react";
import { Link } from "react-router-dom";
import {
  formatDateTime,
  truncateText,
  getFullImageUrl,
} from "../utils/helpers";
import { useTheme } from "../context/ThemeContext";

const ArticleCard = ({ article }) => {
  const { isDarkMode } = useTheme();

  return (
    <Link
      to={`/article/${article.id}`}
      className={`block ${
        isDarkMode ? "bg-gray-900/40" : "bg-white"
      } rounded-lg border ${
        isDarkMode ? "border-gray-800/40" : "border-gray-100"
      } transition-all duration-200 group ${
        isDarkMode
          ? "hover:bg-gray-800/60 hover:border-gray-700/60"
          : "hover:shadow-md hover:shadow-gray-200/80 hover:border-gray-200"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center p-6">
        <div className="flex-1 min-w-0 md:pr-6">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            } mb-2 group-hover:text-[#FF6B00] transition-colors duration-200`}
          >
            {article.title}
          </h2>
          <p
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } mb-4 line-clamp-2 text-sm leading-relaxed`}
          >
            {truncateText(article.post)}
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#FF6B00] flex items-center justify-center text-white text-sm font-medium">
                {article.created_user.name.charAt(0)}
              </div>
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {article.created_user.name}
              </span>
            </div>
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-600" : "text-gray-300"
              }`}
            >
              ·
            </span>
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {formatDateTime(article.created_at)}
            </span>
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-600" : "text-gray-300"
              }`}
            >
              ·
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                isDarkMode
                  ? "bg-gray-800/60 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {article.category.category_name}
            </span>
          </div>
        </div>
        {article.image && (
          <div className="mt-4 md:mt-0 md:w-48 md:flex-shrink-0">
            <img
              src={getFullImageUrl(article.image)}
              alt={article.title}
              className="w-full h-32 md:h-28 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
