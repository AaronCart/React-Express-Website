const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if email and password are a match.
exports.signin = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);

  if (user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Sign In failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  
  // Hash password from react SignUp.js
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    fName: req.body.name1
  });

  res.json(user);
};
