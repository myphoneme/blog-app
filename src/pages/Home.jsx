import React, { useState } from "react";
import SignInModal from "../components/Signin";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#f2efe6] min-h-screen text-black font-serif">
      {/* Header */}
      <header className="flex justify-between items-center p-6 me-20 ms-20 border-b border-gray-300">
        <h1 className="text-2xl font-bold">
          <img
            src="http://myphoneme.com/assets/img/logopng.png"
            alt="Phoneme logo"
            width={120}
            height={120}
          />
        </h1>
        <nav className="flex items-center space-x-6 text-sm">
          <a href="#" className="hover:underline">
            Our story
          </a>
          <a href="#" className="hover:underline">
            Membership
          </a>
          <a href="#" className="hover:underline">
            Write
          </a>
          <a href="#" className="hover:underline">
            Sign in
          </a>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full ml-4"
          >
            Get started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-16 px-6">
        <h2 className="text-6xl font-bold leading-tight">
          Human stories & ideas
        </h2>
        <p className="text-xl mt-4">
          A place to read, write, and deepen your understanding
        </p>
        <button className="mt-6 bg-black text-white px-6 py-3 rounded-full text-lg">
          Start reading
        </button>
      </section>

      {/* Modal */}
      <SignInModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      {/* Footer */}
      <footer className="text-center text-gray-600 mt-50 p-6 border-t border-gray-300">
        <p>
          Help &middot; Status &middot; About &middot; Careers &middot; Press
          &middot; Blog &middot; Privacy &middot; Terms
        </p>
      </footer>
    </div>
  );
};

export default Home;
