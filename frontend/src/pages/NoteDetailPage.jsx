import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const socket = io("https://collaborativenotes.onrender.com");

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote();

    socket.emit("joinNote", id);

    // Listen for real-time updates
    socket.on("noteUpdated", (updatedNote) => {
      if (updatedNote._id === id) {
        setNote(updatedNote);
        setTitle(updatedNote.title);
        setContent(updatedNote.content);

        toast.info(`Note updated by a collaborator!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    });

    return () => {
      socket.off("noteUpdated");
    };
  }, [id]);

  const fetchNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://collaborativenotes.onrender.com/api/notes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNote(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://collaborativenotes.onrender.com/api/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/notes");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Edit Note</h1>
      {note ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border w-full mb-2"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 border w-full"
            rows="5"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            Save
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NoteDetailPage;
