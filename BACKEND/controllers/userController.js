const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Verification = require("../models/Verification.model");

//        !!!!!!!!   IMPORTANT     !!!!!!!!!
// GET USER ROLE
const getRole = async (req, res) => {
  const { role } = await User.findById(req.user.id);

  res.status(200).json(role);
};

//Register user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, country, dob, email, password } = req.body;

    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }],
    });
    if (existingUser) {
      res.status(401).json({
        errorMessage: "User already exists! ",
        status: false,
      });
    } else {
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(password, salt);

      // Add user
      const user = await User.create({
        firstName,
        lastName,
        country,
        dob,
        email,
        password: hashedPwd,
        role: "user",
      });

      if (user) {
        res.status(200).json({
          data: "Registered successfully",
          status: true,
        });
      } else {
        res.status(401).json({
          errorMessage: "Failed to create account!",
          status: false,
        });
      }
    }
  } catch (e) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + e,
      status: false,
    });
  }
};

//Login user
const login = async (req, res) => {
  try {
    if (req.body && req.body.email && req.body.password) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (await bcrypt.compareSync(req.body.password, user.password)) {
          //generate jwt token
          const token = jwt.sign({ id: user._id ,role:user.role}, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });

          res.status(200).json(token);
        } else {
          res.status(401).json({
            errorMessage: "Incorrect Password!",
            status: false,
          });
        }
      } else {
        res.status(401).json({
          errorMessage: "User not registered!",
          status: false,
        });
      }
    } else {
      res.status(401).json({
        errorMessage: "Please fill out the form!",
        status: false,
      });
    }
  } catch (e) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + e,
      status: false,
    });
  }
};

// get token
const getNewToken = async (req, res) => {
  try {
    const userId = req.params.id; // Access the "id" from the URL parameter
    if (userId) {
      const userFetch = await User.findById({ _id: userId });
      if (userFetch) {
        // generate token
        const token = jwt.sign({ id: userFetch._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.json(token);
      } else {
        res.status(404).json({
          errorMessage: "User not found",
        });
      }
    } else {
      res.status(400).json({
        errorMessage: "Id not found in URL parameter",
      });
    }
  } catch (e) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + e,
    });
  }
};

async function getUser(req, res) {
  try {
    // Extract user ID from req.user
    const { _id } = req.user;

    // Find user by ID without password field
    const user = await User.findById(_id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    // Extract user ID from req.user
    const { _id } = req.user;

    // Find user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Destructure new attributes from request body
    const { firstName, lastName, country, dob, email } = req.body;

    // Check if the new email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && email !== user.email && existingUser._id !== user._id) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Update user attributes
    user.firstName =
      firstName !== null && firstName !== undefined
        ? firstName
        : user.firstName;
    user.lastName =
      lastName !== null && lastName !== undefined ? lastName : user.lastName;
    user.country =
      country !== null && country !== undefined ? country : user.country;
    user.dob = dob !== null && dob !== undefined ? dob : user.dob;
    user.email = email !== null && email !== undefined ? email : user.email;

    // Save updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//update password for auth user
async function updatePassword(req, res) {
  try {
    // Extract user ID from req.user
    const { _id } = req.user;

    // Find user by ID
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract current password and new password from request body
    const { currentPassword, newPassword } = req.body;

    // Check if current password matches the one stored in the database
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Encrypt new password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPwd;

    // Save updated user to the database
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const forgotPasswordReset = async (req, res) => {
  try {
    // Unpack parameters from request body
    const { email, verificationCode, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the verification object associated with the user
    const verification = await Verification.findOne({ user: user._id });

    // Check if the verification object exists
    if (!verification) {
      return res
        .status(404)
        .json({ message: "Verification not found for the user." });
    }

    // Check if the verification code matches
    if (verification.forgotPasswordVerificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    // Encrypt new password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPwd;

    // Save the updated user
    await user.save();

    // Respond with success message
    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while resetting the password." });
  }
};

//Get All users
const getAllUsers = async (req, res) => {
  const abc = await User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteEmployee = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.user._id);

    if (deleted) {
      return res.status(200).json({
        message: "Employee deleted successfully.",
        status: true,
      });
    } else {
      return res.status(404).json({
        message: "Employee not found.",
        status: false,
      });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the employee.",
      status: false,
    });
  }
};

//Update User details
const updateEmployee = async (req, res) => {
  try {
    const {
      fullName,
      email,
      username,
      password,
      role,
      dob,
      designation,
      nic,
      etfNo,
      epfNo,
      address,
      isOnline,
      contact,
      leaveDates,
      creditPoints,
      grade,
      baseSalary,
      totCP,
    } = req.body;

    let updateData = {
      fullName,
      email,
      username,
      role,
      dob,
      designation,
      nic,
      etfNo,
      epfNo,
      address,
      isOnline,
      contact,
      leaveDates,
      creditPoints,
      grade,
      baseSalary,
      totCP,
    };

    if (password && typeof password === "string") {
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(password, salt);
      updateData.password = hashedPwd;
    }

    // Updating
    const update = await User.findByIdAndUpdate(req.params.id, updateData);

    if (update) {
      res.status(200).json({
        data: "User updated successfully",
        status: true,
      });
    } else {
      res.status(401).json({
        errorMessage: "Failed to update the User!",
        status: false,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + error,
      status: false,
    });
  }
};

module.exports = {
  getRole,
  registerUser,
  login,
  getUser,
  getAllUsers,
  deleteEmployee,
  updateEmployee,
  forgotPasswordReset,
  getNewToken,
  updatePassword,
  updateUser,
};