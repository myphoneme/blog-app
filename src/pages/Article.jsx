import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { postsAPI } from "../services/api";
import "../styles/article.css";

// Configure DOMPurify
DOMPurify.setConfig({
  ADD_TAGS: ["iframe"],
  ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
});

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await postsAPI.getById(id);

        // Process the HTML content
        if (data.post) {
          // Create a temporary div to parse HTML
          const temp = document.createElement("div");
          // Set the HTML content
          temp.innerHTML = data.post;

          // Clean up the content by removing extra spaces and newlines
          const cleanContent = temp.innerHTML
            .replace(/>\s+</g, "><") // Remove spaces between tags
            .replace(/\s+/g, " ") // Replace multiple spaces with single space
            .trim();

          // Sanitize the content
          data.post = DOMPurify.sanitize(cleanContent, {
            ALLOWED_TAGS: [
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "p",
              "br",
              "hr",
              "strong",
              "em",
              "del",
              "ul",
              "ol",
              "li",
              "blockquote",
              "a",
              "img",
              "pre",
              "code",
              "div",
              "span",
            ],
            ALLOWED_ATTR: ["href", "src", "alt", "class", "target"],
            KEEP_CONTENT: true,
          });
        }

        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Article not found</h2>
          <p>The requested article could not be found.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <header className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {article.title}
          </h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span>{formatDate(article.created_at)}</span>
            <span className="mx-2">•</span>
            <span>{article.category?.name || "Uncategorized"}</span>
          </div>
        </header>

        {article.image && (
          <div className="w-full h-[400px] relative">
            <img
              src={`/api/${article.image}`}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: article.post,
            }}
          />
        </div>
      </article>
    </div>
  );
}
