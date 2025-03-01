import React, { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

const TopicsList = ({
  categories,
  articles,
  selectedCategory,
  onCategorySelect,
  isLoading,
}) => {
  const { isDarkMode } = useTheme();

  // Memoize the article counts to prevent unnecessary recalculations
  const categoryArticleCounts = useMemo(() => {
    const counts = {};
    articles.forEach((article) => {
      if (article.category && article.category.id) {
        counts[article.category.id] = (counts[article.category.id] || 0) + 1;
      }
    });
    return counts;
  }, [articles]);

  if (isLoading) {
    return (
      <div
        className={`mt-6 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg transition-colors duration-200`}
      >
        <div
          className={`h-6 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-200"
          } rounded w-1/2 mb-4 animate-pulse`}
        ></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`h-8 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              } rounded-full w-24 animate-pulse`}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Sort categories alphabetically
  const sortedCategories = [...categories].sort((a, b) =>
    a.category_name.localeCompare(b.category_name)
  );

  return (
    <div
      className={`mt-6 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } p-6 rounded-lg transition-colors duration-200`}
    >
      <h3
        className={`text-lg font-bold ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Recommended Topics
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {sortedCategories.map((category) => {
          const count = categoryArticleCounts[category.id] || 0;
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 transition-colors duration-200 ${
                selectedCategory === category.id
                  ? isDarkMode
                    ? "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span>{category.category_name}</span>
              <span
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicsList;
