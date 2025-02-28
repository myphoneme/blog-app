import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import NewPage from "./NewPage";
// import NewPage2 from "./NewPage2";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import FullArticlePage from "./pages/FullArticlePage";

// import Articles from "../Pages/Articles";

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <Link to="/newPage">Open New Page</Link>
          <Link to="/newPage2">Open New Page 2</Link>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<FullArticlePage />} />

          {/* <Route path="/newPage2" element={<NewPage2 />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
