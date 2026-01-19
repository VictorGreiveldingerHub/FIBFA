const { DataTypes, Model } = require("sequelize");
const client = require("../db_connection");

class Match extends Model {}

Match.init(
  {
    // Définition des attributs
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "PENDING",
    },
    // Pas besoin de définir les clés étrangère ici, Sequelize le fera dans les associations
  },
  {
    // Définition des options de BDD
    sequelize: client,
    tableName: "match",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = Match;
