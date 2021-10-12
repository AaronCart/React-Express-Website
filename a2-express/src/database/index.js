const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);

// Relate post and user
db.post.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });


// Include a sync option with seed data logic included
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary
  if (count > 0)
    return;

  // Used argon2 hashing algorithm 
  const argon2 = require("argon2");

  // Example test users
  let hash = await argon2.hash("Hello123!", { type: argon2.argon2id });
  await db.user.create({ email: "testemail@gmail.com", password_hash: hash, fName: "Sam" });

  hash = await argon2.hash("React456!", { type: argon2.argon2id });
  await db.user.create({ email: "hello@gmail.com", password_hash: hash, fName: "Jim" });
}

module.exports = db;

// Code sourced from week 8 tutorial