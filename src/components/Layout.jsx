import React from "react";
import { useLocation } from "react-router-dom";
import MainHeader from "./MainHeader";

const Layout = ({ children }) => {
  const location = useLocation();

  // Determine if user is logged in (replace this with your actual auth logic)
  const isLoggedIn =
    location.pathname !== "/" &&
    location.pathname !== "/our-story" &&
    location.pathname !== "/membership";

  return (
    <div>
      <MainHeader isLoggedIn={isLoggedIn} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
