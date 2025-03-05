import React from "react";
import { useTheme } from "../../context/ThemeContext";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import QuillEditor from "./QuillEditor";

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

  const handleEditorChange = (content) => {
    onChange({
      target: {
        name: "post",
        value: content,
      },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      encType="multipart/form-data"
    >
      {/* Title and Category Row */}
      <div className="flex gap-3">
        {/* Category Select */}
        <div className="w-1/3">
          <CategorySelect
            value={formData.category_id}
            onChange={onChange}
            categories={categories}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Title Input */}
        <div className="w-2/3">
          <label
            htmlFor="title"
            className={`block text-sm font-medium mb-1 ${
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
            className={`w-full px-3 py-1.5 rounded-md border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-[#FF6B00]`}
            placeholder="Enter article title"
          />
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <label
          className={`block text-sm font-medium mb-1 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Content
        </label>
        <QuillEditor value={formData.post} onChange={handleEditorChange} />
      </div>

      {/* Image Upload */}
      <ImageUpload
        onChange={onImageChange}
        preview={imagePreview}
        isDarkMode={isDarkMode}
      />

      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className={`px-3 py-1.5 rounded-md border ${
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
          className={`px-4 py-1.5 rounded-md bg-[#FF6B00] text-white font-medium hover:bg-[#E65D00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] ${
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
