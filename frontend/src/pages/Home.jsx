import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Collaborative Notes
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Create, share, and edit notes with your team!
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md">
          <Link to={"login"}> Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
