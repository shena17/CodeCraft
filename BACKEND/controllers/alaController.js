const User = require("../models/User.model");
const Tag = require("../models/tag.model");
const Tutorial = require("../models/tutorialsUser.model");
const Tutorials = require("../models/tutorialsUser.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET ALL TAGS
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// GET SPECIFIC TAG
const viewTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    

    res.json(tag);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

//GET ALL TUTORIALS
const getTutorials = async (req, res) => {
  try {
    const tags = await Tutorials.find().populate("tags").exec();
    res.json(tags);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// GET SPECIFIC TUTORIAL
const viewTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id)
      .populate("tags")
      .exec();

    if (!tutorial) {
      return res.status(404).json("Tutorial not found");
    }

    res.json(tutorial);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = {
  getTags,
  viewTag,
  getTutorials,
  viewTutorial,
};
