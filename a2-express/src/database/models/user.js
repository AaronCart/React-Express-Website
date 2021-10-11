const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING(32),
      primaryKey: true
    },
    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    
    // Get rid of createdAt and updatedAt if the DATEONLY format doesn't work
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
