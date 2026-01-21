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
    // Quand même ajouter le champ pour les create / insert
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
