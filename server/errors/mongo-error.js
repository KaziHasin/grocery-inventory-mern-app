const CustomAPIError = require("./custom-error");
const handleMongoError = (error) => {
  if (error.errors) {
    const errorMessages = Object.values(error.errors).map((err) => err.message);
    return new CustomAPIError(errorMessages, 400);
  } else {
    return new CustomAPIError("An error occurred. please try later", 500);
  }
};

module.exports = handleMongoError;
