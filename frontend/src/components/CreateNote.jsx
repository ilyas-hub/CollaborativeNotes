import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote = ({ fetchNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication required. Please log in.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

  
      if (response.status === 201) {
        setTitle("");
        setContent("");
        setError("");

        if (fetchNotes) {
          fetchNotes();
        }

        setTimeout(() => {
          navigate("/notes");
        }, 500);
      }
    } catch (err) {
      console.error("Error creating note:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create note");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 shadow-md rounded-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            rows="4"
            required
          ></textarea>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded mt-3"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
