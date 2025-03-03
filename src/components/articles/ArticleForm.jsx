import React from "react";
import { useTheme } from "../../context/ThemeContext";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";

const ArticleForm = ({
  formData,
  imagePreview,
  categories,
  isLoading,
  onSubmit,
  onChange,
  onImageChange,
  onCancel,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <form
      onSubmit={onSubmit}
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
          onChange={onChange}
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
      <CategorySelect
        value={formData.category_id}
        onChange={onChange}
        categories={categories}
        isDarkMode={isDarkMode}
      />

      {/* Image Upload */}
      <ImageUpload
        onChange={onImageChange}
        preview={imagePreview}
        isDarkMode={isDarkMode}
      />

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
          onChange={onChange}
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
          onClick={onCancel}
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
  );
};

export default ArticleForm;
