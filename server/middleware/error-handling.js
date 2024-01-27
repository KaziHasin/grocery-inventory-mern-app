const CustomAPIError = require("../errors/custom-error");
module.exports = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json(err.message);
  } else {
    res.status(500).json({ msg: err.message });
  }
};
