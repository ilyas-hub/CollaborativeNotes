import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchNotes = ({ setNotes, originalNotes }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (!searchTerm.trim()) {
      setNotes(originalNotes);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/notes/search?query=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotes(response.data);
    } catch (error) {
      console.error(
        "Error searching notes:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex items-center gap-3 bg-gray-100 p-3 shadow-lg rounded-xl border border-gray-300">
      <FaSearch className="text-gray-600" size={20} />

      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={handleSearch}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Link
        to={"/createnote"}
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
      >
        <FaPlus size={20} />
        <span>Create Note</span>
      </Link>
    </div>
  );
};

export default SearchNotes;
