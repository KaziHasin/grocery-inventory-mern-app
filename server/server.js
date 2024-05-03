const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const groceryRoute = require("./routes/groceryRoute");
const authRoute = require("./routes/authRoute");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// import middlewares
const notFound = require("./middleware/not-found");
const errorHandling = require("./middleware/error-handling");

// configuration some packages
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// calling routes
app.use("/api/auth", authRoute);
app.use("/api/grocery", groceryRoute);
app.get("/", (req, res) => {
  res.send("Grocery Inventory");
});

// configuration of the middleware
app.use(notFound);
app.use(errorHandling);

// start the server
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
