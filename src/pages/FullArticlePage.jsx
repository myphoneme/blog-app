import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example article data (replace with actual data fetching logic)
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
      content: "Full content of the article goes here...",
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
      content: "Full content of the article goes here...",
    },
  ];

  const article = articles.find((article) => article.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800"> <img
            src="http://myphoneme.com/assets/img/logopng.png"
            alt="Phoneme logo"
            width={120}
            height={120}
          /></div>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            Back to Articles
          </button>
        </div>
      </header>

      {/* Full Article Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
        <p className="text-gray-600 mt-2">{article.description}</p>
        <div className="mt-4 text-sm text-gray-500">
          {article.date} · {article.reads} · {article.claps}
        </div>
        <img
          src={article.image}
          alt="Article"
          className="mt-4 w-full h-auto rounded-lg"
        />
        <div className="mt-6 text-gray-700">{article.content}</div>
      </div>
    </div>
  );
};

export default FullArticlePage;
