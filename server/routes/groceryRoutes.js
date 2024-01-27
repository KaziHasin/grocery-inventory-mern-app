const express = require("express");
const { model } = require("mongoose");
const {
  allGrocery,
  createGrocery,
} = require("../controllers/GroceryController");
const router = express.Router();

router.get("/", allGrocery);
router.post("/", createGrocery);

module.exports = router;
