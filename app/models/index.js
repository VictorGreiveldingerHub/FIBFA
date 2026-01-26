// Définition des associations

// Import des models
const Match = require("./Match");
const Team = require("./Team");
const Tournament = require("./Tournament");
const User = require("./User");
const MatchTeam = require("./MatchTeam");

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

// =========================
// match <-> team
//  team <-> match
// =========================

Match.belongsToMany(Team, {
  through: MatchTeam,
  foreignKey: "match_id",
  otherKey: "team_id",
  as: "teams",
});

Team.belongsToMany(Match, {
  through: MatchTeam,
  foreignKey: "team_id",
  otherKey: "match_id",
  as: "matchs",
});

// Export des models
module.exports = { Match, Team, Tournament, User, MatchTeam };
