import React, { useState } from "react";
import axios from "axios";
import ShareNote from "./ShareNote";

const NoteDetail = ({ note }) => {
  const [updatedNote, setUpdatedNote] = useState(note);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/notes/${note._id}`,
        updatedNote,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUpdatedNote(res.data);
    } catch (error) {
      alert("Error saving note");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white border rounded-lg shadow-md">
      <input
        type="text"
        value={updatedNote.title}
        onChange={(e) =>
          setUpdatedNote({ ...updatedNote, title: e.target.value })
        }
        className="text-2xl font-bold w-full p-2 border-b mb-4"
      />
      <textarea
        value={updatedNote.content}
        onChange={(e) =>
          setUpdatedNote({ ...updatedNote, content: e.target.value })
        }
        className="w-full p-2 border mb-4"
        rows="8"
      />
      <div className="flex justify-between items-center">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <ShareNote noteId={note._id} />
      </div>
    </div>
  );
};

export default NoteDetail;
