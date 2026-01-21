const { Team, User, Match, Tournament } = require("../models"); // Pour avoir les associations dispos

const teamController = {
  // Récupération de toutes les teams
  getAll: async (req, res, next) => {
    try {
      const teams = await Team.findAll({
        include: [
          {
            model: User,
            as: "users",
          },
          { model: Match, as: "matchs" },
          { model: Tournament, as: "tournaments" },
        ],
      });

      if (!teams) {
        return next();
      }

      res.send(teams);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Création d'une nouvelle team
  create: async (req, res, next) => {
    try {
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Suppression d'une team
  delete: async (req, res, next) => {
    try {
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = teamController;
