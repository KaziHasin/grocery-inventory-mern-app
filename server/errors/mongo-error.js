const CustomAPIError = require("./custom-error");
const handleMongoError = (error) => {
  let statusCode;
  let errorMessages = {};
  if (error.code === 11000) {
    statusCode = 400;
    errorMessages["email"] = "Email must be unique";
  } else if (error.errors) {
    statusCode = 400;
    Object.keys(error.errors).forEach((field) => {
      errorMessages[field] = error.errors[field].message;
    });
  } else {
    statusCode = 500;
    errorMessages["error"] = `Internal server error. Please try again later.`;
  }

  return new CustomAPIError(errorMessages, statusCode);
};

module.exports = handleMongoError;
