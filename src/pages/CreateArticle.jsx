import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "../context/ThemeContext";
import { categoriesAPI, postsAPI } from "../services/api";

const CreateArticle = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const quillRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    post: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesAPI.getAll();
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

  // Handle rich text editor changes
  const handleEditorChange = (content, delta, source, editor) => {
    setFormData((prev) => ({
      ...prev,
      post: editor.getHTML(),
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
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

    // Check for authentication
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to create an article.");
      setIsLoading(false);
      return;
    }

    // Validate required fields
    if (!formData.title.trim()) {
      setError("Title is required");
      setIsLoading(false);
      return;
    }

    if (!formData.category_id) {
      setError("Please select a category");
      setIsLoading(false);
      return;
    }

    if (!formData.post.trim()) {
      setError("Article content is required");
      setIsLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      
      // Format the data
      submitData.append("title", formData.title.trim());
      submitData.append("category_id", parseInt(formData.category_id, 10)); // Ensure category_id is a number
      submitData.append("post", formData.post.trim());
      submitData.append("created_by", 1); // Send as number instead of string

      if (formData.image) {
        // Ensure proper file name and type
        const imageFile = new File([formData.image], formData.image.name, {
          type: formData.image.type,
        });
        submitData.append("image", imageFile);
      }

      // Log the formatted data
      console.log("Submitting article with data:");
      for (let [key, value] of submitData.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const response = await postsAPI.create(submitData);
      console.log("API Response:", response);

      // Show success message
      setSuccessMessage("Article created successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate(`/article/${response.id}`);
      }, 1500);
    } catch (err) {
      console.error("Error creating article:", err);
      if (err.message.includes("Network error")) {
        setError("Unable to connect to the server. Please check your internet connection and try again.");
      } else if (err.message.includes("Unauthorized")) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError(err.message || "Failed to create article. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Quill editor modules and formats configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote"],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "blockquote",
    "align",
  ];

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

            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Rich Text Editor */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Content
                </label>
                <div
                  className={`${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } rounded-lg border ${
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={formData.post}
                    onChange={handleEditorChange}
                    modules={modules}
                    formats={formats}
                    className={`${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } h-64`}
                    preserveWhitespace={true}
                  />
                </div>
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
