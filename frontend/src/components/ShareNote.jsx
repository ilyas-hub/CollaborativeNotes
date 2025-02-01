import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShareNote = ({ noteId }) => {
  const [identifier, setIdentifier] = useState(""); 
  const [message, setMessage] = useState(""); 

  const navigate = useNavigate();

  const handleShare = async () => {
    if (!identifier.trim()) {
      setMessage("Enter a valid email or username!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://collaborativenotes.onrender.com/api/notes/${noteId}/share`,
        { identifier },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message || "Note shared successfully!");
      setIdentifier("");
      navigate(`/notes`);
    } catch (error) {
      console.error("Error sharing note:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error sharing note.");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter email or username"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button
        onClick={handleShare}
        className="bg-green-500 text-white px-4 rounded hover:bg-green-600 transition"
      >
        Share
      </button>
    </div>
  );
};

export default ShareNote;

