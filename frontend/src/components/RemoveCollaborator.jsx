import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUserMinus } from "react-icons/fi";

const RemoveCollaborator = ({ noteId }) => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://collaborativenotes.onrender.com/api/notes/${noteId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCollaborators(response.data.collaborators);
      } catch (error) {
        console.error(
          "Error fetching note:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleRemove = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://collaborativenotes.onrender.com/api/notes/${noteId}/remove-collaborator`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      setCollaborators(collaborators.filter((collab) => collab._id !== userId));
    } catch (error) {
      console.error(
        "Error removing collaborator:",
        error.response?.data || error.message
      );
      alert("Error removing collaborator.");
    }
  };

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Collaborators
      </h3>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : collaborators.length === 0 ? (
        <p className="text-gray-500">No collaborators yet.</p>
      ) : (
        <ul className="space-y-2">
          {collaborators.map((collab) => (
            <li
              key={collab._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
            >
              <span className="text-gray-800 font-medium">
                {collab.username} ({collab.email})
              </span>
              <button
                onClick={() => handleRemove(collab._id)}
                className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
              >
                <FiUserMinus className="mr-1" /> Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemoveCollaborator;
