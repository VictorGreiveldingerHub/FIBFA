const { Model, DataTypes } = require("sequelize");
const client = require("../db_connection");

class MatchTeam extends Model {}

MatchTeam.init(
  {
    match_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "match", key: "id" },
    },
    team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "team", key: "id" },
    },
    team_position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0, max: 1 }, // 0 ou 1
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: client,
    tableName: "match_team",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = MatchTeam;
