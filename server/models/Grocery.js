const mongoose = require("mongoose");

const GrocerySchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
    },
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    pricePerKg: {
      type: Number,
      required: [true, "Price is required"],
      trim: true,
    },
    discountPercentage: {
      type: Number,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grocery", GrocerySchema);
