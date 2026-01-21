const { Tournament, Match, Team } = require("../models");
const { generateRoundRobinMatchs } = require("../utils/roundRobin");

const tournamentController = {
  // Récupère la liste des tournois avec les informations de bases et les teams associées
  // Avec :
  // - nom
  // - date
  // - description
  // - status
  // - le nombre de team associées
  getAll: async (req, res, next) => {
    try {
      const tournaments = await Tournament.findAll({
        include: [{ model: Team, as: "teams" }],
      });

      res.send(tournaments);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Récupère la liste des informations d'un tournois spécifique
  // Avec :
  // - la liste des matchs
  // - la liste des teams
  // - le classement
  getOne: async (req, res, next) => {
    try {
      const tournamentId = req.params.id;

      const tournamentInfos = await Tournament.findOne({
        where: { id: tournamentId },
        include: [
          {
            model: Team,
            as: "teams",
          },
          { model: Match, as: "matchs" },
        ],
      });

      if (!tournamentInfos) {
        return next(); // 404
      }

      res.send(tournamentInfos);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  //
  generate: async (req, res, next) => {
    try {
      let tournamentId = req.params.id;
      const teamsPerTournament = [];
      const tournamentData = await Tournament.findAll({
        include: [{ model: Team, as: "teams" }],
        where: { id: tournamentId },
      });
      for (let datas of tournamentData) {
        for (let team of datas.teams) {
          teamsPerTournament.push(team.name);
        }
      }
      console.log(teamsPerTournament);

      const generated = generateRoundRobinMatchs(teamsPerTournament);

      res.send(generated);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, date, description, creator_id } = req.body;
      const newTournament = new Tournament({
        name,
        date,
        description,
        creator_id: parseInt(creator_id),
      });

      await newTournament.save();

      res.send(newTournament);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const tournamentID = req.params.id;

      const deletedTournament = await Tournament.destroy({
        where: { id: tournamentID },
      });

      if (deletedTournament === 0) {
        return next();
      }

      res.status(200).json({ message: "Tournoi supprimé avec succès" });
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = tournamentController;
