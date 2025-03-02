import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NewPage from "./NewPage";
// import NewPage2 from "./NewPage2";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import FullArticlePage from "./pages/FullArticlePage";
import SearchPage from "./pages/Search";
import CreateArticle from "./pages/CreateArticle";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";

// import Articles from "../Pages/Articles";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          {/* <nav>
            <Link to="/newPage">Open New Page</Link>
            <Link to="/newPage2">Open New Page 2</Link>
          </nav> */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<FullArticlePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/write" element={<CreateArticle />} />

            {/* <Route path="/newPage2" element={<NewPage2 />} /> */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
