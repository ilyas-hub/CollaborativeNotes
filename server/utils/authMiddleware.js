const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "a8f9e7d6c5b4a3d2f1e0g9h8i7j6k5l4m3n2o1p0q9r8s7t6u5v4w3x2y1z0";

const User = require("../models/User");

exports.protect = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

