import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "../../context/ThemeContext";

const QuillEditor = ({ value, onChange }) => {
  const { isDarkMode } = useTheme();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "align",
    "link",
    "image",
  ];

  return (
    <div className={isDarkMode ? "dark-mode-editor" : ""}>
      <style>
        {`
          .dark-mode-editor .ql-toolbar {
            background-color: #1f2937;
            border-color: #374151;
          }
          
          .dark-mode-editor .ql-container {
            background-color: #1f2937;
            border-color: #374151;
          }
          
          .dark-mode-editor .ql-editor {
            color: #e5e7eb;
          }
          
          .dark-mode-editor .ql-stroke {
            stroke: #e5e7eb;
          }
          
          .dark-mode-editor .ql-fill {
            fill: #e5e7eb;
          }
          
          .dark-mode-editor .ql-picker {
            color: #e5e7eb;
          }
          
          .dark-mode-editor .ql-picker-options {
            background-color: #1f2937;
            border-color: #374151;
          }
          
          .dark-mode-editor .ql-toolbar button:hover .ql-stroke,
          .dark-mode-editor .ql-toolbar button.ql-active .ql-stroke {
            stroke: #FF6B00;
          }
          
          .dark-mode-editor .ql-toolbar button:hover .ql-fill,
          .dark-mode-editor .ql-toolbar button.ql-active .ql-fill {
            fill: #FF6B00;
          }
        `}
      </style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-64 mb-12"
      />
    </div>
  );
};

export default QuillEditor;
