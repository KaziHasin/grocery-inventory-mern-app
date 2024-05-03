const Grocery = require("../models/Grocery");
const handleMongoError = require("../errors/mongo-error");

/** Get all grocery items
 * @method GET api/grocery
 * @param {Object} req
 * @param {Object} res
 */
const allGrocery = async (req, res) => {
  try {
    const groceries = await Grocery.find().sort({ createdAt: -1 });

    res.status(200).json({ groceries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/** Create a new grocery item
 * @method POST api/grocery
 * @param {Object} req
 * @param {Object} res
 */
const createGrocery = async (req, res, next) => {
  try {
    const grocery = await Grocery.create(req.body);
    res
      .status(201)
      .json({ grocery, message: "Grocery Item created successfully" });
  } catch (error) {
    next(handleMongoError(error));
  }
};


/** Show a new grocery item
 * @method GET api/grocery/:id
 * @param {Object} req
 * @param {Object} res
 */
const showGrocery = async (req, res, next) => {
  try {
    const id = req.params.id;
    const grocery = await Grocery.findById(id);
    res
      .status(200)
      .json({ grocery });
  } catch (error) {
    next(handleMongoError(error));
  }
};


/** Update a new grocery item
 * @method PUT api/grocery/:id
 * @param {Object} req
 * @param {Object} res
 */
const updateGrocery = async (req, res, next) => {
  try {
    const id = req.params.id;
    const grocery = await Grocery.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
    res
      .status(200)
      .json({ grocery, message: "Grocery Item Updated successfully" });
  } catch (error) {
    next(handleMongoError(error));
  }
};


/** Delete a new grocery item
 * @method DELETE api/grocery/:id
 * @param {Object} req
 * @param {Object} res
 */
const deleteGrocery = async (req, res, next) => {
  try {
    const id = req.params.id;
    const grocery = await Grocery.deleteOne({ _id: id });
    res
      .status(200)
      .json({ grocery, message: "Grocery Item Deleted successfully" });
  } catch (error) {
    next(handleMongoError(error));
  }
};

module.exports = {
  allGrocery,
  createGrocery,
  showGrocery,
  updateGrocery,
  deleteGrocery
};
