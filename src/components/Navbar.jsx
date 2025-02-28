import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        Medium Clone
      </Link>
      <Link to="/create" className="bg-blue-600 px-4 py-2 rounded">
        Write Article
      </Link>
    </nav>
  );
}

export default Navbar;
