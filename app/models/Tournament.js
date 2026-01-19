const { DataTypes, Model } = require("sequelize");
const client = require("../db_connection");

class Tournament extends Model {}

Tournament.init(
  {
    // Définition des attributs
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Tournois de Baby-Foot",
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "PENDING",
    },
    // Pas besoin de définir les clés étrangère ici, Sequelize le fera dans les associations
  },
  {
    // Définition des options de BDD
    sequelize: client,
    tableName: "tournament",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = Tournament;
