import React from "react";

const ImageUpload = ({ onChange, preview, isDarkMode }) => {
  return (
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
          onChange={onChange}
          className={`block w-full text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium ${
            isDarkMode
              ? "file:bg-gray-800 file:text-gray-300"
              : "file:bg-gray-100 file:text-gray-700"
          } hover:file:bg-[#FF6B00] hover:file:text-white`}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-20 w-20 object-cover rounded"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
