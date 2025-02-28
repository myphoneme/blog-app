import React, { useState } from "react";
import { Link } from "react-router-dom";

const ArticleListingPage = () => {
  const [activeTab, setActiveTab] = useState("For you");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const tabs = ["For you", "Following", "Featured"];

  const articles = [
    {
      id: "1",
      title: "Laziness Does Not Exist",
      description:
        "Psychological research is clear: when people procrastinate, there’s usually a good reason",
      date: "Mar 24, 2018",
      reads: "34K",
      claps: "21KT",
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: "2",
      title: "10 Seconds That Ended My 10-Year Career",
      description:
        "It’s 8:30 am and I’m seated at my desk. I’m wearing my brown Cole Haans, Banana Republic slacks and J.Crew button-down. I feel...",
      date: "May 24, 2022",
      reads: "22K",
      claps: "37Z",
      image: "https://via.placeholder.com/600x400",
    },
  ];

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
          <div className="text-2xl font-bold text-gray-800">Medium</div>

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
            articles.map((article, index) => (
              <Link
                key={index}
                to={`/article/${article.id}`}
                className="block bg-white p-6 rounded-lg mb-6"
              >
                <div className="flex justify-between">
                  <div className="w-2/3">
                    <h2 className="text-xl font-bold text-gray-800">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{article.description}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      {article.date} · {article.reads} · {article.claps}
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-end">
                    <img
                      src={article.image}
                      alt="Article"
                      className="w-full h-auto rounded-lg"
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
              {staffPicks.map((pick, index) => (
                <div key={index}>
                  <h4 className="text-sm font-semibold text-gray-700">
                    {pick.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {pick.time} {pick.author && `· ${pick.author}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">
              Recommended Topics
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Technology
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Health
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Finance
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Productivity
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListingPage;
