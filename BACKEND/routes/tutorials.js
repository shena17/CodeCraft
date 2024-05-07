const router = require("express").Router();
let Tutorial = require("../models/tutorial.model");
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

router.route("/add").post((req, res) => {
  const tutorialid = req.body.tutorialid;
  const url = req.body.url;
  const attach = req.body.attach;
  const heading = req.body.heading;
  const tags = req.body.tags;

  const newTutorial = new Tutorial({
    tutorialid,
    url,
    attach,
    heading,
    tags,
  });

  newTutorial
    .save()
    .then(() => res.json("New Tutorial added to the system!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Tutorial.findById(req.params.id)
    .then((tutorial) => res.json(tutorial))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Tutorial.findByIdAndDelete(req.params.id)
    .then(() => res.json("Tutorial deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  Tutorial.findById(req.params.id)
    .then((tutorial) => {
      tutorial.tutorialid = req.body.tutorialid;
      tutorial.url = req.body.url;
      tutorial.attach = req.body.attach;
      tutorial.heading = req.body.heading;
      tutorial.tags = req.body.tags;

      tutorial
        .save()
        .then(() => res.json("Tutorial details updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
