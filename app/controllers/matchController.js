const { Match, Team } = require("../models");

const matchController = {
  // Méthode de récupération de tous les matchs
  getAll: async (req, res) => {
    try {
      const matchs = await Match.findAll();

      res.send(matchs);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Méthode de récupération d'un match
  getOne: async (req, res, next) => {
    try {
      const matchId = req.params.id;

      const match = await Match.findByPk(matchId, {
        include: [
          {
            model: Team,
            as: "teams",
            through: {
              attributes: [
                "team_position",
                "score",
                "created_at",
                "updated_at",
              ],
            },
          },
        ],
      });

      if (!match) {
        return next();
      }

      res.send(match);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Modifier le score d'un match
  update: async (req, res, next) => {
    try {
      // Récupérer l'id du match
      const matchId = req.params.id;

      const match = Match.findByPk(matchId, {
        include: [{ model: Team, as: "teams" }],
      });

      res.send(match);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = matchController;
