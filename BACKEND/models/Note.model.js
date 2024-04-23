const mongoose = require('mongoose');

// Define the Note schema
const noteSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
});

// Create the Note model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
