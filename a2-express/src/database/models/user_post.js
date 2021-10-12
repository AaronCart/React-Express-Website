// module.exports = (sequelize, DataTypes) =>
//   sequelize.define("user_post", {
//     email: {
//       type: DataTypes.STRING(50),
//       primaryKey: true,
//       references: {
//         model: sequelize.user,
//         key: "email"
//       }
//     },
//     post_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       references: {
//         model: sequelize.post,
//         key: "post_id"
//       }
//     },
//   }, {
//     // Don't add timestamp attributes (updatedAt, createdAt)
//     timestamps: false
//   });
