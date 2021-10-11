module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users
  router.get("/", controller.all);

  // Select a single user with id
  router.get("/select/:id", controller.one);

  // Select one user from the database if email and password are a match
  router.get("/signin", controller.signin);

  // Create a new user
  router.post("/", controller.create);

  // Add routes to server to reduce duplication
  app.use("/api/users", router);
};
