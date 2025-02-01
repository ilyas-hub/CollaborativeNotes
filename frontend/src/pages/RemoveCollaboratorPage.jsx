import React from "react";
import { useParams } from "react-router-dom";
import RemoveCollaborator from "../components/RemoveCollaborator";

const RemoveCollaboratorPage = () => {
  const { id } = useParams();

  return (
    <div className="w-[80%] mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Manage Collaborators
      </h2>
      <p className="text-gray-600 mb-4">
        Add or remove collaborators for this note.
      </p>

      <RemoveCollaborator noteId={id} />
    </div>
  );
};

export default RemoveCollaboratorPage;
