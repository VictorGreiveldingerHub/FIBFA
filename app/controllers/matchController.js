const { Match } = require("../models");

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
      // Controle si l'id est valide
      if (req.params.id === "0") {
        return next();
      }
      const matchId = req.params.id;
      const match = await Match.findByPk(matchId);

      if (!match) {
        return next();
      }
      res.send(match);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = matchController;
