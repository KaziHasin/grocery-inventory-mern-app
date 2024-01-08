const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const groceryRoutes = require("./routes/groceryRoutes");
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
// Middleware
const notFound = require("./middleware/not-found");
const errorHandling = require("./middleware/error-handling");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/grocery", groceryRoutes);
app.get("/", (req, res) => {
  res.send("Grocery Inventory");
});

app.use(notFound);
app.use(errorHandling);

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
