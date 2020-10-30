const express = require('express');
const router = express.Router();

const {createNote, getNotebById, getNote, getAllNotes, updateNote, removeNote} = require('../controllers/note');

//defining url/:id id as noteId
router.param('noteId', getNotebById);

//to create note
router.post("/note/create",createNote);

//to check note his profile he should be signed in as well as authenticated
router.get('/note/:noteId',getNote);

//to get all notes
router.get('/notes', getAllNotes);

//update note
router.put('/note/update/:noteId', updateNote);

//delete note
router.delete('/note/delete/:noteId', removeNote)

module.exports = router;