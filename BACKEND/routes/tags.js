const router = require("express").Router();
let Tag = require("../models/tag.model");

router.route("/").get((req, res) => {
  Tag.find()
    .then((tags) => res.json(tags))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const tagid = req.body.tagid;
  const tagname = req.body.tagname;
  const tag = req.body.tag;

  const newTag = new Tag({
    tagid,
    tagname,
    tag,
  });

  newTag
    .save()
    .then(() => res.json("New Tag added to the system!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Tag.findById(req.params.id)
    .then((tag) => res.json(tag))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Tag.findByIdAndDelete(req.params.id)
    .then(() => res.json("Tag deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  Tag.findById(req.params.id)
    .then((tag) => {
      tag.tagid = req.body.tagid;
      tag.tagname = req.body.tagname;
      tag.tag = req.body.tag;

      tag
        .save()
        .then(() => res.json("Tag details updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
