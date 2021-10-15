const db = require("../database");

// Select all posts from the database
exports.all = async (req, res) => {
  const posts = await db.post.findAll();
  res.json(posts);
};

// Create a post in the database with user's email
exports.create = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    email: req.body.email,
    likes: req.body.likes,
    dislikes: req.body.dislikes
  });

  res.json(post);
};

// Code sourced from week 8 tutorial