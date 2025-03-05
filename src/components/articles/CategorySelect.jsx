import React from "react";

const CategorySelect = ({ value, onChange, categories, isDarkMode }) => {
  return (
    <div>
      <label
        htmlFor="category_id"
        className={`block text-sm font-medium mb-1 ${
          isDarkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        Category
      </label>
      <select
        id="category_id"
        name="category_id"
        value={value}
        onChange={onChange}
        required
        className={`w-full px-3 py-1.5 rounded-md border ${
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
  );
};

export default CategorySelect;
