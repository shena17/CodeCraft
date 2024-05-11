const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  getTags,
  viewTag,
  getTutorials,
  viewTutorial,
  createAla,
  getAla,
  getChart,
} = require("../controllers/alaController");

// GET ALL TAGS
router.get("/getTags", getTags);

//  GET SPECIFIC TAG
router.get("/viewTag/:id", protect, viewTag);

//GET ALL TUTORIALS
router.get("/getTutorials", getTutorials);

// GET SPECIFIC TUTORIAL
router.get("/viewTutorial/:id", protect, viewTutorial);

// CREATE ALA SYSTEM
router.post("/createAla", protect, createAla);

//GET ALL TUTORIALS
router.get("/getAla", protect, getAla);

router.get("/getChart", protect, getChart);

module.exports = router;
