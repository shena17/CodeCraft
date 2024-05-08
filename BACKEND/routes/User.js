const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  login,
  registerUser,
  // getRole,
  getUser,
  updatePassword,
  updateUser,
  forgotPasswordReset,
  // getAllUsers,
  deleteEmployee,
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
router.get("/get", protect, getUser);

// update password for auth user
router.post("/update-password", protect, updatePassword);
// update password for non-auth user
router.put("/reset-password", forgotPasswordReset);
// update user 
router.put("/update", protect, updateUser);



// GET ALL USERS
// router.get("/getAllUsers", getAllUsers);

// UPDATE PROJECT DETAILS
// router.put("/updateUser/:id", updateEmployee);

// DELETE USER
 router.delete("/deleteUser",protect, deleteEmployee);

//GET NEW TOKEN
// router.post("/token/:id", getNewToken);

module.exports = router;
