const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    if (req.body && req.body.username && req.body.password) {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        if (await bcrypt.compareSync(req.body.password, user.password)) {
          //generate jwt token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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

//Get user
const getUser = async (req, res) => {
  const {
    _id,
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
  } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
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
  });
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

//Delete User
const deleteEmployee = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (deleted) {
      res.status(200).json({
        data: "Employee Deleted",
        status: true,
      });
    } else {
      res.status(401).json({
        errrorMessage: "Failed to delete Employee!",
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
  getNewToken,
};
