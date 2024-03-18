const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  login,
  registerUser,
  // getRole,
  // getUser,
  // getAllUsers,
  // deleteEmployee,
  // updateEmployee,
  // getNewToken,
} = require("../controllers/userController");

//REGISTER
router.post("/register", registerUser);

//LOGIN
router.post("/login", login);

// GET ROLE
// router.get("/getRole", protect, getRole);

// GET USER
// router.get("/get", protect, getUser);

// GET ALL USERS
// router.get("/getAllUsers", getAllUsers);

// UPDATE PROJECT DETAILS
// router.put("/updateUser/:id", updateEmployee);

// DELETE USER
// router.delete("/deleteUser/:id", deleteEmployee);

//GET NEW TOKEN
// router.post("/token/:id", getNewToken);

module.exports = router;
