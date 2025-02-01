import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaShareAlt, FaUsers, FaTrash } from "react-icons/fa";
import SearchNotes from "../components/SearchNotes";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [originalNotes, setOriginalNotes] = useState([]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://collaborativenotes.onrender.com/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(response.data);
      setOriginalNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (noteId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://collaborativenotes.onrender.com/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
      setOriginalNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="mx-auto w-[80%] p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Notes</h1>
      <SearchNotes setNotes={setNotes} originalNotes={originalNotes} />

      <ul className="mt-6 space-y-4">
        {notes.map((note) => (
          <li
            key={note._id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {note.title}
            </h3>
            <p className="text-gray-700 mt-2">{note.content}</p>

            <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-4">
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate(`/note/${note._id}`)}
              >
                <FaEye /> View
              </button>

              <button
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                onClick={() => navigate(`/note/${note._id}/share`)}
              >
                <FaShareAlt /> Share
              </button>

              <button
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => navigate(`/note/${note._id}/collaborators`)}
              >
                <FaUsers /> Collaborators
              </button>

              <button
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                onClick={() => handleDelete(note._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
