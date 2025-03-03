import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

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

      // Log the formatted data
      console.log("Submitting article with data:");
      for (let [key, value] of submitData.entries()) {
        if (key === "post") {
          console.log(`${key}: [Content length: ${value.length}]`);
        } else if (key === "image") {
          console.log(
            `${key}: ${value.name} (${value.type}, ${value.size} bytes)`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        body: submitData,
        headers: {
          Accept: "application/json",
        },
      });

      // Log the response status and headers
      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // Try to get the response text first
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }

      if (!response.ok) {
        console.error("Error response data:", responseData);
        throw new Error(
          responseData.message || `HTTP error! status: ${response.status}`
        );
      }

      console.log("API Response:", responseData);

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
            <h1
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Create New Article
            </h1>

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

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-[#FF6B00]`}
                  placeholder="Enter article title"
                />
              </div>

              {/* Category Select */}
              <div>
                <label
                  htmlFor="category_id"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-[#FF6B00]`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Featured Image
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`block w-full text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium ${
                      isDarkMode
                        ? "file:bg-gray-800 file:text-gray-300"
                        : "file:bg-gray-100 file:text-gray-700"
                    } hover:file:bg-[#FF6B00] hover:file:text-white`}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded"
                    />
                  )}
                </div>
              </div>

              {/* Content Textarea */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Content
                </label>
                <textarea
                  name="post"
                  value={formData.post}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-[#FF6B00]`}
                  placeholder="Write your article content here..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className={`px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-lg bg-[#FF6B00] text-white font-medium hover:bg-[#E65D00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Publishing..." : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
