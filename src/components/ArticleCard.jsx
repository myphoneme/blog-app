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
        isDarkMode ? "bg-gray-800" : "bg-white"
      } p-6 rounded-lg mb-6 hover:shadow-lg transition-all duration-200 ${
        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between">
        <div className="w-2/3">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {article.title}
          </h2>
          <p
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } mt-2 line-clamp-3`}
          >
            {truncateText(article.post)}
          </p>
          <div className="mt-4 flex items-center space-x-2 text-sm">
            <span
              className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {formatDateTime(article.created_at)} · By{" "}
              {article.created_user.name}
            </span>
            <span
              className={`${isDarkMode ? "text-gray-600" : "text-gray-300"}`}
            >
              ·
            </span>
            <span
              className={`${
                isDarkMode
                  ? "text-blue-400 bg-blue-900/50"
                  : "text-blue-600 bg-blue-50"
              } px-2 py-1 rounded-full text-xs`}
            >
              {article.category.category_name}
            </span>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <img
            src={getFullImageUrl(article.image)}
            alt={article.title}
            className="w-full h-48 rounded-lg object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
