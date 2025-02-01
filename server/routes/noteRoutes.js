const express = require("express");
const {
  createNote,
  getUserNotes,
  searchNote,
  getNote,
  updateNote,
  deleteNote,
  shareNote,
  removeCollaborator,
} = require("../controllers/noteController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getUserNotes);
router.get("/search", protect, searchNote);
router.put("/:id/remove-collaborator", protect, removeCollaborator);
router.get("/:id", protect, getNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.put("/:id/share", protect, shareNote);

module.exports = router;
