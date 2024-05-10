const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ status: "Error", message: "Token expired" });
      }
      return res
        .status(401)
        .json({ status: "Error", message: "Not authorized" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ status: "Error", message: "No token provided" });
  }
};

module.exports = { protect };
