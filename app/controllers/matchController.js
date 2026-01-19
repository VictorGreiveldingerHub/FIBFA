const Match = require("../models/Match");

const matchController = {
  // Méthode de récupération de tous les matchs
  getAll: async (req, res) => {
    try {
      const matchs = await Match.findAll();

      res.send(matchs);
    } catch (error) {
      console.log(error);
    }
  },

  // Méthode de récupération d'un match
  getOne: async (req, res) => {
    try {
      const matchId = req.params.id;
      const match = await Match.findByPk(matchId, {});

      if (!match) {
        return next();
      }
      res.send(match);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = matchController;
