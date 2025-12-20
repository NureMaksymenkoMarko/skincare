require("dotenv").config();
const jwt = require("jsonwebtoken");
const { models } = require("../models");

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

module.exports = async (req, res, next) => {
  if (!req.cookies || !req.cookies.access) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = req.cookies.access;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user_id = decoded.id;

    const user = await models.User.findByPk(req.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.is_admin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid token", error: err.message });
  }
};
