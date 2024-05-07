const router = require("express").Router();
const { protect } = require("../middleware/authorization");
const { getTags } = require("../controllers/alaController");

//REGISTER
router.get("/getTags", getTags);

// GET USER
// router.get("/get", protect, getUser);

module.exports = router;
