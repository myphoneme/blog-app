import React from "react";

const Avatar = ({ src, alt, size = "40px" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="rounded-full border"
      style={{ width: size, height: size }}
    />
  );
};

export { Avatar };
