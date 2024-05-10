const ALA = require("../models/ALA.model");
const User = require("../models/User.model");
const Tag = require("../models/tag.model");
const Tutorial = require("../models/tutorialsUser.model");
const Tutorials = require("../models/tutorialsUser.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

// CREATING OR UPDATING DOCUMENT
const createAla = async (req, res) => {
  try {
    const { tags } = req.body;
    const tagObjects = [];
    let updateSuccessful = false;
    const uniqueTagIds = new Set(); // Set to store unique tag IDs
    let _id; // Declare _id variable here
    const toUpdate = [];

    for (const tagName of tags) {
      // Find the tag by name
      const tag = await Tag.findOne({ tagname: tagName });

      if (!tag) {
        return res.status(404).json(`Tag "${tagName}" not found`);
      }

      _id = new mongoose.Types.ObjectId(); // Corrected usage
      tagObjects.push({ _id, tag: tag._id, count: 1 });
    }

    // Search for an existing document with the given _id
    let existingALA = await ALA.findById(req.user.id);

    if (existingALA) {
      // UPDATE EXISTING DOCUMENT
      for (const alaTags of existingALA.tags) {
        const existingTag = tagObjects.findIndex(
          (obj) => String(obj.tag) === String(alaTags.tag)
        );

        if (existingTag !== -1) {
          alaTags.count++;
          await existingALA.save();
          tagObjects.splice(existingTag, 1);
          updateSuccessful = true;
        }
      }

      for (const newTag of tagObjects) {
        existingALA.tags.push(newTag);
      }

      await existingALA.save();

      if (updateSuccessful) {
        return res.status(200).json("Update successful");
      } else {
        return res.status(500).json("No updates or creations made");
      }
    } else {
      // CREATE NEW DOCUMENT
      const newALA = new ALA({
        _id: req.user.id,
        userId: req.user.id,
        tags: tagObjects,
      });

      await newALA.save();
      return res.status(200).json(newALA);
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// MERGING DUPLICATE TAGS
const mergeDuplicateTags = async (tags) => {
  const tagIds = new Set();
  const updatedTags = [];

  for (const tag of tags) {
    if (!tagIds.has(tag.tag.toString())) {
      tagIds.add(tag.tag.toString());
      updatedTags.push(tag);
    } else {
      const existingTag = updatedTags.find(
        (t) => String(t.tag) === String(tag.tag)
      );
      existingTag.count += tag.count;
    }
  }

  return updatedTags;
};

//GET ALL TUTORIALS BY USER
const getAla = async (req, res) => {
  try {
    // Find ALA document by user id
    const alaDocument = await ALA.findById(req.user.id);

    // Check if ALA document exists
    if (!alaDocument) {
      return res
        .status(404)
        .json({ error: `ALA document with id ${req.user.id} not found` });
    }

    // Sort tags by count in descending order
    alaDocument.tags.sort((a, b) => b.count - a.count);

    // Select top 5 tags
    const topTags = alaDocument.tags.slice(0, 5).map((tag) => tag.tag._id);

    // Find tutorials that contain any of the top tags
    const tutorials = await Tutorial.find({ tags: { $in: topTags } })
      .populate("tags")
      .exec();

    // Return the list of tutorials
    return res.status(200).json(tutorials);
  } catch (error) {
    console.error("Error finding ALA document by id:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTags,
  viewTag,
  getTutorials,
  viewTutorial,
  createAla,
  getAla,
};
