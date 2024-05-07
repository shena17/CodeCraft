const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  login,
  registerUser,
  getUser,
  deleteEmployee,
} = require("../controllers/userController");

//REGISTER
router.post("/register", registerUser);

//LOGIN
router.post("/login", login);

// GET USER
router.get("/get", protect, getUser);

// // update password for auth user
// router.post("/update-password", protect, updatePassword);
// // update password for non-auth user
// router.put("/reset-password", forgotPasswordReset);
// // update user
// router.put("/update", protect, updateUser);

// DELETE USER
router.delete("/deleteUser", protect, deleteEmployee);

module.exports = router;
