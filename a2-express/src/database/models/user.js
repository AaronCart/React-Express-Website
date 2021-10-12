module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING(32),
      primaryKey: true
    },
    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },

    // fname is just short for Full Name
    fName: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  });
