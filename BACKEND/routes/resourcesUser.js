const router = require("express").Router();
let Resource = require("../models/resourcesUser.model");
let Tag = require("../models/tag.model");

router.route("/").get((req, res) => {
  Resource.find()
    .then((resources) => res.json(resources))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/createResource").post(async (req, res) => {
  try {
    const { type, source, heading, tags } = req.body;
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

    const resource = new Resource({
      type,
      source,
      heading,
      tags: tagIds, // Store all tag IDs in the tagIds array
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").get((req, res) => {
  Resource.findById(req.params.id)
    .then((resource) => res.json(resource))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
