import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { postsAPI } from "../services/api";
import { formatDateTime, getFullImageUrl } from "../utils/helpers";
import StaffPicks from "../components/StaffPicks";
import TopicsList from "../components/TopicsList";

const FullArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [articleData, allArticles] = await Promise.all([
          postsAPI.getById(id),
          postsAPI.getAll(),
        ]);
        setArticle(articleData);

        // Get related articles from the same category
        const related = allArticles
          .filter(
            (a) => a.id !== id && a.category.id === articleData.category.id
          )
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);
        setRelatedArticles(related);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load the article. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-100"}`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div
              className={`h-8 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              } rounded w-1/4 mb-8`}
            ></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8">
                <div
                  className={`${
                    isDarkMode ? "bg-gray-900/40" : "bg-white"
                  } rounded-lg p-8`}
                >
                  <div
                    className={`h-10 ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    } rounded w-3/4 mb-4`}
                  ></div>
                  <div
                    className={`h-4 ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    } rounded w-1/4 mb-8`}
                  ></div>
                  <div
                    className={`h-64 ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    } rounded mb-8`}
                  ></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`h-4 ${
                          isDarkMode ? "bg-gray-800" : "bg-gray-200"
                        } rounded w-full`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block md:col-span-4">
                <div className="space-y-6">
                  <div
                    className={`h-64 ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    } rounded`}
                  ></div>
                  <div
                    className={`h-64 ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    } rounded`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-100"}`}
      >
        <div className="container mx-auto px-4 py-8">
          <div
            className={`text-center py-16 ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium">
              {error || "Article not found"}
            </h3>
            <div className="mt-6">
              <button
                onClick={() => navigate(-1)}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF6B00] hover:bg-[#E65D00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00]`}
              >
                ← Back to Articles
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 inline-flex items-center space-x-2 ${
            isDarkMode
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-gray-800"
          } transition-colors duration-200`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Articles</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="md:col-span-8">
            <article
              className={`${
                isDarkMode ? "bg-gray-900/40" : "bg-white"
              } rounded-lg border ${
                isDarkMode ? "border-gray-800/40" : "border-gray-100"
              } transition-all duration-200`}
            >
              {/* Article Header */}
              <div className="p-8">
                <div className={`flex items-center space-x-4 mb-6`}>
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00] flex items-center justify-center text-white text-lg font-medium">
                    {article.created_user.name.charAt(0)}
                  </div>
                  <div>
                    <h3
                      className={`font-medium ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {article.created_user.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {formatDateTime(article.created_at)}
                    </p>
                  </div>
                </div>

                <h1
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  } mb-4`}
                >
                  {article.title}
                </h1>

                <div className={`flex items-center space-x-4 mb-8`}>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      isDarkMode
                        ? "bg-gray-800/60 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {article.category.category_name}
                  </span>
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {article.read_time || "5 min read"}
                  </span>
                </div>

                {article.image && (
                  <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                    <img
                      src={getFullImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/800x400?text=Image+Not+Available";
                      }}
                    />
                  </div>
                )}

                <div
                  className={`prose max-w-none ${
                    isDarkMode ? "prose-invert" : ""
                  } ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {article.post}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="hidden md:block md:col-span-4">
            <div className="sticky top-4 space-y-6">
              <StaffPicks articles={relatedArticles} isLoading={false} />
              <TopicsList
                categories={[article.category]}
                articles={[article]}
                selectedCategory={article.category.id}
                onCategorySelect={() => {}}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullArticlePage;
