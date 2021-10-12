module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      // Sets the maximum length for a post (600 characters)
      type: DataTypes.STRING(600),
      allowNull: false
    }
  });
