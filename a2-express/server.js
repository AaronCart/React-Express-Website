const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Used to sync database in background
db.sync();

const app = express();

// Parse requests of content-type - application/json
app.use(express.json());

// Add CORS suport
app.use(cors());

// Simple Hello World route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add user routes
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);

// Set port to 4000 and listen for requests
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Code sourced from week 8 tutorial