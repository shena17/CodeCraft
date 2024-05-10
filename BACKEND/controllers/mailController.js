"use strict";
const nodemailer = require("nodemailer");
const mailObj = require("../templates/email-template");
const User = require("../models/User.model");
const Verification = require("../models/Verification.model");
const generateRandomCode = require("../utils/randomCodeGenerator");

// Create a transporter
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});



// Exported function to send password verification mail
exports.passwordVerificationMail = async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Check if the user has a verification object associated with them
        let verification = await Verification.findOne({ user: user._id });

        // If no verification object exists, create a new one and associate it with the user
        if (!verification) {
            verification = new Verification({ user: user._id });
            await verification.save();
        }
       
        // Generate a random verification code
        const forgotPasswordVerificationCode = generateRandomCode();

        // Save the generated code to the verification object
        verification.forgotPasswordVerificationCode = forgotPasswordVerificationCode;
        await verification.save();

        const param1 = "Your forgot password verification code is ";
        const param2 = forgotPasswordVerificationCode;

        mailObj.to = user.email;

        // Use the imported mail object configuration
        const mailOptions = {
            ...mailObj,
            html: mailObj.html(param1, param2)
        };

        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        console.log(`Message sent: ${info.messageId}`);
        res.status(200).json({ message: `Message sent: ${info.messageId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Something went wrong in sending the email. Error: ${error.message}` });
    }
};

