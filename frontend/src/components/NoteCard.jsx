import React from "react";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/note/${note._id}`);
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md mb-4">
      <h2 className="font-bold text-xl">{note.title}</h2>
      <p className="text-gray-600">{note.content.substring(0, 100)}...</p>
      <button
        onClick={handleClick}
        className="text-blue-600 mt-2 hover:underline"
      >
        View Note
      </button>
    </div>
  );
};

export default NoteCard;
