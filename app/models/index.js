// Définition des associations

// Import des models
const Match = require("./Match");
const Team = require("./Team");
const Tournament = require("./Tournament");
const User = require("./User");

// Pour chaques associations, on a 2 config a faire
// L'une dans un sens, et l'autre dans le sens inverse

// =========================
//      match <-> tournament
// tournament <-> match
// =========================

Tournament.hasMany(Match, {
  foreignKey: "tournament_id",
  as: "matchs",
});

Match.belongsTo(Tournament, {
  foreignKey: "tournament_id",
  as: "tournament",
});

// ===============
// match <-> team
//  team <-> match
// ===============

Match.belongsToMany(Team, {
  through: "match_team",
  foreignKey: "match_id",
  otherKey: "team_id",
  as: "teams",
});

Team.belongsToMany(Match, {
  through: "match_team",
  foreignKey: "team_id",
  otherKey: "match_id",
  as: "matchs",
});

// ==============
// team <-> user
// user <-> team
// ==============

Team.hasMany(User, {
  foreignKey: "team_id",
  as: "users",
});

User.belongsTo(Team, {
  foreignKey: "team_id",
  as: "team",
});

// =========================
//       team <-> tournament
// tournament <-> team
// =========================

Team.belongsToMany(Tournament, {
  through: "team_tournament",
  foreignKey: "team_id",
  otherKey: "tournament_id",
  as: "tournaments",
});

Tournament.belongsToMany(Team, {
  through: "team_tournament",
  foreignKey: "tournament_id",
  otherKey: "team_id",
  as: "teams",
});

// =========================
//       user <-> tournament
// tournament <-> user
// =========================

User.hasMany(Tournament, {
  foreignKey: "creator_id",
  as: "tournaments",
});

Tournament.belongsTo(User, {
  foreignKey: "creator_id",
  as: "creator",
});

// Export des models
module.exports = { Match, Team, Tournament, User };
