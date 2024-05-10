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
    const tagObjects = [];
    let updateSuccessful = false;

    for (const tagName of tags) {
      // Find the tag by name
      const tag = await Tag.findOne({ tagname: tagName });

      if (!tag) {
        return res.status(404).json(`Tag "${tagName}" not found`);
      }

      tagObjects.push({ _id: tag._id, tag: tag._id, count: 1 });
    }

    // Search for an existing document with the given _id
    const existingALA = await ALA.findById(req.user.id);

    if (existingALA) {
      // UPDATE EXISTING DOCUMENT
      for (const alaTags of existingALA.tags) {
        const existingTag = tagObjects.find(
          (obj) => String(obj.tag) === String(alaTags._id)
        );

        if (existingTag) {
          alaTags.count++;
          await existingALA.save();
          updateSuccessful = true;
        } else {
          await ALA.findByIdAndUpdate(
            req.user.id,
            {
              $addToSet: {
                tags: { _id: alaTags._id, tag: alaTags._id, count: 1 },
              },
            }, // Add new tags to the existing tags array
            { new: true } // Return the updated document
          );
          updateSuccessful = true;
        }
      }

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

// UPDATE TAGS IN ALA ARRAY
const updateAla = async (req, res) => {
  try {
    const { tags } = req.body;
    const tagIds = []; // Initialize tagIds variable

    // Iterate over each tag name in the array
    for (const tagName of tags) {
      // Find the tag by name
      const tag = await Tag.findOne({ tagname: tagName });

      if (!tag) {
        // If tag not found, handle the error accordingly
        return res.status(404).json(`Tag "${tagName}" not found`);
      }

      // Check if the tag already exists in tagObjects
      const existingTag = tagIds.find(
        (obj) => String(obj.tag) === String(tag._id)
      );
      if (existingTag) {
        existingTag.count++;
      } else {
        tagIds.push({ _id: tag._id, tag: tag._id, count: 1 });
      }
    }

    // Find the ALA document by its _id and update the tags array
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
