const Note = require('../models/Note.model');
const User = require('../models/User.model');

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const { topic, description } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newNote = new Note({
            topic,
            description,
            userRef: req.user._id
        });

        await newNote.save();

        res.status(201).json({ message: 'Note created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all notes belonging to the logged-in user
exports.getNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const notes = await Note.find({ userRef: req.user._id });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    try {
        const { id } = req.body;
        const { topic, description } = req.body;

        const note = await Note.findOne({ _id: id, userRef: req.user._id });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.topic = topic;
        note.description = description;

        await note.save();

        res.status(200).json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findOneAndDelete({ _id: id, userRef: req.user._id });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
