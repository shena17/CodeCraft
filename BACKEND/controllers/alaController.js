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

const createAla = async (req, res) => {
  try {
    const { tags } = req.body;
    const tagObjects = [];
    let updateSuccessful = false;
    const uniqueTagIds = new Set(); // Set to store unique tag IDs
    let _id; // Declare _id variable here

    for (const tagName of tags) {
      // Find the tag by name
      const tag = await Tag.findOne({ tagname: tagName });

      if (!tag) {
        return res.status(404).json(`Tag "${tagName}" not found`);
      }

      // Check if the tag ID is already in the uniqueTagIds set
      if (!uniqueTagIds.has(tag._id.toString())) {
        // If the tag ID is not in the set, push the tag object to tagObjects
        _id = new mongoose.Types.ObjectId(); // Corrected usage
        tagObjects.push({ _id, tag: tag._id, count: 1 });
        uniqueTagIds.add(tag._id.toString()); // Add the tag ID to the set
      } else {
        // If the tag ID is already in the set, you may want to handle it here
        // For now, let's just log a message
        console.log(`Tag "${tagName}" already exists in tagObjects array.`);
      }
    }

    // Search for an existing document with the given _id
    let existingALA = await ALA.findById(req.user.id);

    if (existingALA) {
      const updatedTags = await mergeDuplicateTags(existingALA.tags);

      // Update the document with the updatedTags array
      existingALA = await ALA.findByIdAndUpdate(
        req.user.id,
        { tags: updatedTags },
        { new: true }
      );

      // UPDATE EXISTING DOCUMENT
      for (const alaTags of existingALA.tags) {
        const existingTag = tagObjects.find(
          (obj) => String(obj.tag) === String(alaTags.tag)
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
                tags: {
                  _id,
                  tag: alaTags.tag,
                  count: 1,
                },
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

// const mergeDuplicateTags = async (tags) => {
//   const duplicateIds = new Set();

//   // Find duplicate IDs
//   tags.forEach((tag, index) => {
//     if (tags.findIndex((t) => t.tag === tag.tag) !== index) {
//       duplicateIds.add(tag.tag);
//     }
//   });

//   // Remove duplicate tags from the array
//   const updatedTags = tags.filter((tag) => !duplicateIds.has(tag.tag));

//   return updatedTags;
// };

//GET ALL TUTORIALS
const getAla = async (req, res) => {
  try {
    const alaDocuments = await ALA.find().populate("tags.tag").exec();
    const uniqueAlaDocuments = alaDocuments.map((ala) => {
      const uniqueTags = Array.from(
        new Set(ala.tags.map((tag) => tag._id.toString()))
      ).map((tagId) => {
        return ala.tags.find((tag) => tag._id.toString() === tagId);
      });
      return { ...ala.toObject(), tags: uniqueTags };
    });
    res.json(uniqueAlaDocuments);
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
  getAla,
};
