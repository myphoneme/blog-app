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
        className={`${
          isDarkMode ? "bg-gray-900/80" : "bg-white"
        } p-6 rounded-lg border ${
          isDarkMode ? "border-gray-800/60" : "border-gray-100"
        } transition-all duration-200`}
      >
        <div
          className={`h-6 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          } rounded w-1/2 mb-4 animate-pulse`}
        ></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`h-8 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
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
        Recommended Topics
      </h3>
      <p
        className={`text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        } mb-4`}
      >
        Popular categories you might like
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {sortedCategories.map((category) => {
          const count = categoryArticleCounts[category.id] || 0;
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm flex items-center space-x-1.5 transition-all duration-200 ${
                isSelected
                  ? "bg-[#FF6B00] text-white hover:bg-[#E65D00]"
                  : isDarkMode
                  ? "bg-gray-800/80 hover:bg-gray-700/80 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span>{category.category_name}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isSelected
                    ? "bg-[#E65D00] text-white/90"
                    : isDarkMode
                    ? "bg-gray-700/80 text-gray-400"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicsList;
