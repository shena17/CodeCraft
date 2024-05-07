const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { protect } = require('../middleware/authorization');

// Create a new note
router.post('/create', protect,noteController.createNote);

// Get all notes
router.get('/all',protect, noteController.getNotes);

// Update a note
router.put('/update',protect, noteController.updateNote);

// Delete a note
router.delete('/delete/:id', protect, noteController.deleteNote);

module.exports = router;
