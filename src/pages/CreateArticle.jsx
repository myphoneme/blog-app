import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ArticleForm from "../components/articles/ArticleForm";

const CreateArticle = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    post: "",
    created_by: 1,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      }
    };
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      submitData.append("category_id", formData.category_id);
      submitData.append("title", formData.title);

      // Clean and encode the post content to handle special characters
      const cleanPost = formData.post
        .replace(
          /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDE3]/g,
          ""
        )
        .trim();

      submitData.append("post", cleanPost);
      submitData.append("created_by", formData.created_by);

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        body: submitData,
        headers: {
          Accept: "application/json",
        },
      });

      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }

      if (!response.ok) {
        throw new Error(
          responseData.message || `HTTP error! status: ${response.status}`
        );
      }

      // Show success message
      setSuccessMessage("Article created successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate(`/article/${responseData.id}`);
      }, 1500);
    } catch (err) {
      console.error("Error creating article:", err);
      setError(err.message || "Failed to create article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`${
              isDarkMode ? "bg-gray-900/40" : "bg-white"
            } rounded-lg border ${
              isDarkMode ? "border-gray-800/40" : "border-gray-100"
            } p-6 md:p-8`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Create New Article
            </h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
                {successMessage}
              </div>
            )}

            <ArticleForm
              formData={formData}
              imagePreview={imagePreview}
              categories={categories}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onChange={handleInputChange}
              onImageChange={handleImageChange}
              onCancel={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
