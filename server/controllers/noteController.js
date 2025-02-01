const Note = require("../models/Note");
const User = require("../models/User");
const { getIo } = require("../utils/socket");

exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      title,
      content,
      owner: req.user.id,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
};

exports.getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      $or: [{ owner: req.user.id }, { collaborators: req.user.id }],
    }).populate("owner collaborators");

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

exports.getNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId).populate("owner collaborators");
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note" });
  }
};

exports.updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const userId = req.user.id;
    const isOwner = note.owner.toString() === userId;
    const isCollaborator = note.collaborators.includes(userId);

    if (!isOwner && !isCollaborator) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this note" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    getIo().to(noteId).emit("noteUpdated", note);

    res.json({ message: "Note updated successfully", note });
  } catch (error) {
    console.error("Update Note Error:", error);
    res.status(500).json({ message: "Error updating note" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, owner: userId });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: error.message });
  }
};

exports.searchNote = async (req, res) => {
  const { query } = req.query;

  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    const userId = req.user._id.toString();

    let filter = { owner: userId };

    if (query && query.trim() !== "") {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ];
    }

    const notes = await Note.find(filter);

    res.json(notes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error searching notes", error: error.message });
  }
};

exports.shareNote = async (req, res) => {
  try {
    const { id } = req.params; // Note ID
    const { identifier } = req.body; // Email or Username

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Ensure only the owner can share the note
    if (note.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Find user by email or username
    const userToShare = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!userToShare) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already a collaborator
    if (note.collaborators.includes(userToShare._id)) {
      return res.status(400).json({ message: "User already a collaborator" });
    }

    // Add the user as a collaborator
    note.collaborators.push(userToShare._id);
    await note.save();

    res.json({ message: "Note shared successfully", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sharing note", error: error.message });
  }
};

exports.removeCollaborator = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    note.collaborators = note.collaborators.filter(
      (collabId) => collabId.toString() !== userId
    );
    await note.save();

    res.json({ message: "Collaborator removed", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing collaborator", error: error.message });
  }
};
