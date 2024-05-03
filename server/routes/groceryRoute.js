const express = require("express");
const authorization = require("../middleware/authorization");

const {
  allGrocery,
  createGrocery,
  showGrocery,
  updateGrocery,
  deleteGrocery
} = require("../controllers/GroceryController");
const router = express.Router();

router.use(authorization);
router.get("/", allGrocery);
router.post("/", createGrocery);
router.get("/:id", showGrocery);
router.put("/:id", updateGrocery);
router.delete("/:id", deleteGrocery);

module.exports = router;
