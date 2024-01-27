const User = require("../models/User.js");
const handleMongoError = require("../errors/mongo-error");

/** Register new user
 * @API api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "Register successfully", user });
  } catch (error) {
    next(handleMongoError(error));
  }
};

module.exports = { register };
