import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const FullArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Example article data (replace with actual data fetching logic)
  const articles = [
    {
      id: "1",
      title: "Laziness Does Not Exist",
      description:
        "Psychological research is clear: when people procrastinate, there's usually a good reason",
      date: "Mar 24, 2018",
      reads: "34K",
      claps: "21KT",
      image: "https://via.placeholder.com/600x400",
      content: "Full content of the article goes here...",
    },
    {
      id: "2",
      title: "10 Seconds That Ended My 10-Year Career",
      description:
        "It's 8:30 am and I'm seated at my desk. I'm wearing my brown Cole Haans, Banana Republic slacks and J.Crew button-down. I feel...",
      date: "May 24, 2022",
      reads: "22K",
      claps: "37Z",
      image: "https://via.placeholder.com/600x400",
      content: "Full content of the article goes here...",
    },
  ];

  const article = articles.find((article) => article.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 flex items-center space-x-2 ${
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

        <article
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-lg p-8`}
        >
          <h1
            className={`text-3xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            } mb-4`}
          >
            {article.title}
          </h1>
          <p
            className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-4`}
          >
            {article.description}
          </p>
          <div
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            } mb-6`}
          >
            {article.date} · {article.reads} reads · {article.claps} claps
          </div>
          <img
            src={article.image}
            alt="Article"
            className="w-full h-auto rounded-lg mb-6"
          />
          <div
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } prose max-w-none`}
          >
            {article.content}
          </div>
        </article>
      </div>
    </div>
  );
};

export default FullArticlePage;
