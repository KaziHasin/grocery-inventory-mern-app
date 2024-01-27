const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const handleMongoError = require("../errors/mongo-error");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      minlength: [3, "Name must be at least 3 character"],
      maxlength: [30, "Name cannot be more than 30"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number.`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  try {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(handleMongoError(error));
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
