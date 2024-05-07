const router = require("express").Router();
let Tutorial = require("../models/tutorialsUser.model");
let Tag = require("../models/tag.model");

router.route("/").get((req, res) => {
  Tutorial.find()
    .then((tutorials) => res.json(tutorials))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/createTutorial").post(async (req, res) => {
  try {
    const { tutorialid, videos, attach, heading, description, tags } = req.body;
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

    const tutorial = new Tutorial({
      tutorialid,
      videos,
      attach,
      heading,
      description,
      tags: tagIds, // Store all tag IDs in the tagIds array
    });

    await tutorial.save();
    res.status(201).json(tutorial);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
