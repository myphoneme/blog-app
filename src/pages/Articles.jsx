// export default ArticleListingPage;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArticleListingPage = () => {
  const [activeTab, setActiveTab] = useState("For you");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const tabs = ["For you", "Following", "Featured"];

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    // Extract unique categories from articles
    if (articles.length > 0) {
      const uniqueCategories = Array.from(
        new Set(articles.map((article) => article.category))
      ).filter(Boolean);
      setCategories(uniqueCategories);
    }
  }, [articles]);

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://fastapi.phoneme.in/posts");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Get latest 3 articles for staff picks
  const getStaffPicks = () => {
    return articles
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3);
  };

  // Get article count by category
  const getArticleCountByCategory = (categoryId) => {
    return articles.filter((article) => article.category_id === categoryId)
      .length;
  };

  const getFullImageUrl = (imagePath) => {
    return `http://fastapi.phoneme.in/${imagePath}`;
  };

  // Function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    // Add leading zero if needed
    const padZero = (num) => num.toString().padStart(2, "0");

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  // Function to truncate text to a specific number of words
  const truncateText = (text, maxWords = 30) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const staffPicks = [
    {
      title: "First-person perspectives on 3 years of war in Ukraine",
      time: "19h ago",
      author: "Sarah Frith",
    },
    {
      title: "Via Negative and Negative Capability",
      time: "Feb 18",
      author: "Kate Alexandra",
    },
    {
      title: "The day I got a ketamine infusion while my house burned down.",
      time: "Jan 26",
      author: "",
    },
  ];

  const followedPeople = [
    {
      name: "John Doe",
      bio: "Writer and thinker",
      image: "https://via.placeholder.com/40",
    },
    {
      name: "Jane Smith",
      bio: "Tech enthusiast",
      image: "https://via.placeholder.com/40",
    },
    {
      name: "Alice Johnson",
      bio: "Health and wellness advocate",
      image: "https://via.placeholder.com/40",
    },
  ];

  const profileOptions = [
    "Write",
    "Profile",
    "Library",
    "Stories",
    "Stats",
    "Settings",
    "Refine recommendations",
    "Manage publications",
    "Help",
    "Become a Medium member",
    "Create a Mastodon account",
    "Apply for author verification",
    "Apply to the Partner Program",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {/* Brand Name */}
          <div className="text-2xl font-bold text-gray-800">
            <img
              src="http://myphoneme.com/assets/img/logopng.png"
              alt="Phoneme logo"
              width={120}
              height={120}
            />
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-4 max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 text-sm"
            />
          </div>

          {/* Icons and Profile Picture */}
          <div className="flex items-center space-x-4">
            {/* Write Icon */}
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>

            {/* Notification Icon */}
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Profile Picture with Alphabet */}
            <div className="relative">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    {profileOptions.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
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
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Article List */}
        <div className="col-span-2">
          {activeTab === "For you" &&
            articles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="block bg-white p-6 rounded-lg mb-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between">
                  <div className="w-2/3">
                    <h2 className="text-xl font-bold text-gray-800">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mt-2 line-clamp-3">
                      {truncateText(article.post)}
                    </p>
                    <div className="mt-4 flex items-center space-x-2 text-sm">
                      <span className="text-gray-500">
                        {formatDateTime(article.created_at)} · By{" "}
                        {article.created_user.name}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs">
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
            ))}

          {activeTab === "Following" && (
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800">Following</h2>
              <div className="mt-4 space-y-4">
                {followedPeople.map((person, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {person.name}
                      </h3>
                      <p className="text-xs text-gray-500">{person.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Sidebar */}
        <div className="col-span-1 sticky top-0 h-screen overflow-y-auto">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">Staff Picks</h3>
            <div className="mt-4 space-y-4">
              {getStaffPicks().map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors duration-200"
                >
                  <h4 className="text-sm font-semibold text-gray-700 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateTime(article.created_at)} ·{" "}
                    {article.created_user.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">
              Recommended Topics
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    /* Add category filter logic here */
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center space-x-1 transition-colors duration-200"
                >
                  <span>{category.category_name}</span>
                  <span className="text-xs text-gray-500">
                    ({getArticleCountByCategory(category.id)})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListingPage;
