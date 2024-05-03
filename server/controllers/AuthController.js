const User = require("../models/User.js");
const handleMongoError = require("../errors/mongo-error");
const generateToken = require("../utils/generateToken");
const { validationResult } = require("express-validator");

/** Register new user
 * @API api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (user) {
      user.password = undefined;
      generateToken(res, user._id);
      res.status(201).json({ message: "Register successfully", user });
    } else {
      next(handleMongoError(ErrorMessage));
    }
  } catch (error) {
    next(handleMongoError(error));
  }
};

/** Login new user
 * @API api/auth/login
 */
const login = async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Validate email and password using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      user.password = undefined;
      generateToken(res, user._id);
      res.status(200).json({ message: "Login successful", user });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(handleMongoError(error));
  }
};

module.exports = { register, login };
