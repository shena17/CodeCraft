const ALA = require("../models/ALA.model");
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

// CREATE ALA SYSTEM
const createAla = async (req, res) => {
  try {
    const { tags } = req.body;
    const tagIds = [];

    for (const tagName of tags) {
      // Find the tag by name
      const tag = await Tag.findOne({ tagname: tagName });

      if (!tag) {
        // If tag not found, handle the error accordingly
        return res.status(404).json(`Tag "${tagName}" not found`);
      }

      // Push the tag ID to the tagIds array
      tagIds.push(tag._id);
    }

    // Search for an existing document with the given _id
    const existingALA = await ALA.findById(req.user.id);

    if (existingALA) {
      updateAla(req, res);
    } else {
      // If document does not exist, create a new document
      const newALA = new ALA({
        _id: req.user.id,
        userId: req.user.id,
        tags: tagIds, // Store all tag IDs in the tagIds array
      });
      await newALA.save();
      res.status(201).json(ala);
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// UPDATE TAGS IN ALA ARRAY
const updateAla = async (req, res) => {
  try {
    const { tags } = req.body;
    const tagIds = [];

    // Iterate over each tag name in the array
    for (const tagName of tags) {
      // Find the tag by name
      const tag = await Tag.findOne({ tagname: tagName });

      if (!tag) {
        // If tag not found, handle the error accordingly
        return res.status(404).json(`Tag "${tagName}" not found`);
      }

      // Push the tag ID to the tagIds array
      tagIds.push(tag._id);
    }
    // Find the document by its _id and update the tags array
    const updatedALA = await ALA.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { tags: { $each: tagIds } } }, // Add new tags to the existing tags array
      { new: true } // Return the updated document
    );

    return res.status(200).json(updatedALA);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = {
  getTags,
  viewTag,
  getTutorials,
  viewTutorial,
  createAla,
  updateAla,
};
