const User = require("../models/User.model");
const Tag = require("../models/tag.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//        !!!!!!!!   IMPORTANT     !!!!!!!!!
// GET USER ROLE
const getRole = async (req, res) => {
  const { role } = await User.findById(req.user.id);

  res.status(200).json(role);
};

// GET TAGS FOR USER
const getTags = async (req, res) => {
  Tag.find()
    .then((tags) => res.json(tags))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getRole,
  getTags,
};
