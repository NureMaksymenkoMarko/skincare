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

    const user = await models.User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user_id = Number(decoded.id);

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid token", error: err.message });
  }
};
