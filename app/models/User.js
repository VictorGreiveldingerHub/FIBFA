const { DataTypes, Model } = require("sequelize");
const client = require("../db_connection");

class User extends Model {}

User.init(
  {
    // Définition des attributs
    pseudo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "USER",
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // Pas besoin de définir les clés étrangère ici, Sequelize le fera dans les associations
  },
  {
    // Définition des options de BDD
    sequelize: client,
    tableName: "user",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = User;
