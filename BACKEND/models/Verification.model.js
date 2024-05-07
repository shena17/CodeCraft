const mongoose = require('mongoose');

// Define the verification schema
const verificationSchema = new mongoose.Schema({

    forgotPasswordVerificationCode: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        unique: true // Ensure user reference is unique
    }
});

// Create a Verification model from the schema
const Verification = mongoose.model('Verification', verificationSchema);

module.exports = Verification;
