import React from "react";
import { useParams } from "react-router-dom";
import ShareNote from "../components/ShareNote";

const ShareNotePage = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto w-[80%] p-4">
      <h2 className="text-xl font-bold mb-4">Share Note</h2>
      <ShareNote noteId={id} />
    </div>
  );
};

export default ShareNotePage;
