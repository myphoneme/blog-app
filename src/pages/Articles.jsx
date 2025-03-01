// export default ArticleListingPage;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import StaffPicks from "../components/StaffPicks";
import TopicsList from "../components/TopicsList";
import TabNavigation from "../components/TabNavigation";
import { postsAPI, categoriesAPI } from "../services/api";

const FollowingTabContent = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="text-center py-6">
        <div className="bg-white rounded-lg p-6 shadow-sm max-w-xl mx-auto">
          <div className="mb-4">
            <svg
              className="mx-auto h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Discover and Follow Your Favorite Authors
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Sign in to personalize your feed and follow authors whose content
            resonates with you. Get notified when they publish new articles.
          </p>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
              Sign In
            </button>
            <button className="w-full bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              Create Account
            </button>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              What you'll get:
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-2 text-xs text-gray-600">
                  Personalized article recommendations
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-2 text-xs text-gray-600">
                  Follow your favorite authors
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-2 text-xs text-gray-600">
                  New article notifications
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-2 text-xs text-gray-600">
                  Bookmark articles to read later
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Content for logged-in users would go here */}
      {/* This would show followed authors' articles */}
    </div>
  );
};

const ArticleListingPage = () => {
  const [activeTab, setActiveTab] = useState("For you");
  const [allArticles, setAllArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchArticlesByCategory(selectedCategory);
    } else {
      handleTransition(() => {
        setDisplayedArticles(allArticles);
      });
    }
  }, [selectedCategory, allArticles]);

  const handleTransition = async (callback) => {
    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for fade out
    callback();
    setIsTransitioning(false);
  };

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [articlesData, categoriesData] = await Promise.all([
        postsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      setAllArticles(articlesData);
      setDisplayedArticles(articlesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setError("Failed to load content. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArticlesByCategory = async (categoryId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await postsAPI.getByCategory(categoryId);
      await handleTransition(() => {
        if (data && data.length === 0) {
          const categoryName = categories.find(
            (cat) => cat.id === categoryId
          )?.category_name;
          setError({
            type: "empty_category",
            message: (
              <div className="text-center py-8 transition-opacity duration-300">
                <div className="bg-white rounded-lg p-6 shadow-sm inline-block min-w-[300px]">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No articles in {categoryName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    This category doesn't have any articles yet.
                  </p>
                  <button
                    onClick={handleBackToAll}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    ← Back to all articles
                  </button>
                </div>
              </div>
            ),
          });
        } else {
          setDisplayedArticles(data);
          setError(null);
        }
      });
    } catch (error) {
      console.error("Error fetching articles by category:", error);
      setError({
        type: "error",
        message: (
          <div className="text-center py-8 text-red-500 transition-opacity duration-300">
            <div className="bg-red-50 rounded-lg p-4 inline-block min-w-[300px]">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Unable to load articles. Please try again.</span>
              </div>
              <button
                onClick={handleBackToAll}
                className="mt-3 text-sm text-red-700 hover:text-red-800 font-medium transition-colors duration-200"
              >
                ← Back to all articles
              </button>
            </div>
          </div>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get latest 3 articles for staff picks
  const getStaffPicks = () => {
    return allArticles
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  // Handle back to all articles
  const handleBackToAll = () => {
    setIsLoading(true); // Show loading state while transitioning
    handleTransition(async () => {
      setSelectedCategory(null);
      setError(null);
      setDisplayedArticles(allArticles);
      setIsLoading(false);
    });
  };

  // Get current category name
  const getCurrentCategoryName = () => {
    if (!selectedCategory) return null;
    return categories.find((cat) => cat.id === selectedCategory)?.category_name;
  };

  const EmptyStateMessage = () => {
    const categoryName = getCurrentCategoryName();
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No articles found in {categoryName}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            We couldn't find any articles in this category at the moment.
          </p>
          <div className="mt-6">
            <button
              onClick={handleBackToAll}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View all articles
            </button>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">
              You might be interested in:
            </h4>
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              {categories
                .filter((cat) => cat.id !== selectedCategory)
                .slice(0, 3)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {cat.category_name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoadingArticles = () => (
    <div className="space-y-4 animate-fade-in">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white p-6 rounded-lg animate-pulse h-48">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <TabNavigation
        tabs={["For you", "Following", "Featured"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Article List */}
        <div className="col-span-2">
          <div
            className={`transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {activeTab === "Following" ? (
              <FollowingTabContent />
            ) : error ? (
              typeof error === "string" ? (
                <div className="text-center py-8 text-red-500">{error}</div>
              ) : (
                error.message
              )
            ) : isLoading ? (
              <LoadingArticles />
            ) : activeTab === "For you" && displayedArticles.length > 0 ? (
              <div className="space-y-4 animate-fade-in">
                {displayedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <EmptyStateMessage />
            )}
          </div>
        </div>

        {/* Fixed Sidebar */}
        <div className="col-span-1 sticky top-0 h-screen overflow-y-auto">
          <StaffPicks articles={getStaffPicks()} isLoading={isLoading} />
          <TopicsList
            categories={categories}
            articles={allArticles}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

// Add these styles to your CSS or Tailwind config
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
`;

export default ArticleListingPage;
