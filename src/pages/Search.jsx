import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ArticleCard from "../components/ArticleCard";
import { postsAPI } from "../services/api";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { isDarkMode } = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Replace this with your actual API call
        const results = await postsAPI.search(query);
        setSearchResults(results);
      } catch (err) {
        console.error("Error searching articles:", err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (!query) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-4 py-8">
          <h1
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Please enter a search term
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1
          className={`text-2xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Search Results for "{query}"
        </h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`p-6 rounded-lg animate-pulse ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`h-4 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  } rounded w-3/4 mb-4`}
                ></div>
                <div
                  className={`h-4 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  } rounded w-1/2`}
                ></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            className={`text-center py-8 ${
              isDarkMode ? "text-red-400" : "text-red-500"
            }`}
          >
            {error}
          </div>
        ) : searchResults.length === 0 ? (
          <div
            className={`text-center py-8 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No results found for "{query}"
          </div>
        ) : (
          <div className="space-y-4">
            {searchResults.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
