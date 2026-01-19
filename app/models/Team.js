const { DataTypes, Model } = require("sequelize");
const client = require("../db_connection");

class Team extends Model {}

Team.init(
  {
    // Définition des attributs
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    // Définition des options de BDD
    sequelize: client,
    tableName: "team",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = Team;
