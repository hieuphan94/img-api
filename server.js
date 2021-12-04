const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const tourRoutes = require("./src/routes/tour.route");

const app = express();
app.use(bodyParser.json());

require("dotenv").config({
  path: "./src/config/index.env",
});

// Connect DB
const connectDB = require("./src/config/db");
connectDB();

// CORS
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("test route => home page");
});

app.use("/api/tour", tourRoutes);

app.use((req, res) => {
  res.status(404).json({
    msg: "Page not founded",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
