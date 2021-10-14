module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users
  router.get("/", controller.all);

  // Select a single user with email
  router.get("/select/:email", controller.one);

  // Select one user from the database if email and password are a match
  router.get("/signin", controller.signin);

  // Create a new user
  router.post("/", controller.create);

  // Update a user's details
  router.put("/", controller.update);

  // Add routes to server to reduce duplication
  app.use("/api/users", router);
};

// Code sourced from week 8 & 9 tutorials