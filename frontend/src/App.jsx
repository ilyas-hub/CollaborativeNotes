import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NoteDetailPage from "./pages/NoteDetailPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShareNotePage from "./pages/ShareNotePage";
import RemoveCollaboratorPage from "./pages/RemoveCollaboratorPage";
import CreateNote from "./components/CreateNote";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (location.pathname === "/notes") {
      setKey((prevKey) => prevKey + 1);
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar key={key} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/note/:id/share" element={<ShareNotePage />} />
        <Route
          path="/note/:id/collaborators"
          element={<RemoveCollaboratorPage />}
        />
      </Routes>
    </>
  );
};

export default App;
