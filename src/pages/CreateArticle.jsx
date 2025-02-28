import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateArticle() {
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: "",
    author: "",
    content: "",
  });

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating saving the article (later, we'll connect this to a backend)
    console.log("Article Created:", article);

    // Navigate back to home after saving
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl font-bold mb-4">Create a New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          value={article.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={article.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Write your article here..."
          value={article.content}
          onChange={handleChange}
          className="w-full p-2 border rounded h-40"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Publish Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
