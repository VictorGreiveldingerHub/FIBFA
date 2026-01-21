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

      const tournamentDatas = await Tournament.findByPk(tournamentId, {
        include: [
          {
            model: Team,
            as: "teams",
          },
          { model: Match, as: "matchs" },
        ],
      });

      if (!tournamentDatas) {
        return next(); // 404
      }

      res.send(tournamentDatas);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Récupère les teams présentent dans un tournois, passe par une fonction de génération de match (round robin)
  // selon le tournois correspondant,
  // génère le tableau de match correspondant
  generate: async (req, res, next) => {
    try {
      // Je rècupère l'id du tournois correspondant
      let tournamentId = req.params.id;
      // Initialisation du tableau de match
      const teamsPerTournament = [];
      // Récupération des teams associées à un tournois
      const tournamentDatas = await Tournament.findByPk(tournamentId, {
        include: [{ model: Team, as: "teams" }],
      });

      if (!tournamentDatas) {
        return next(); // 404
      }

      // Récupération des noms des teams
      // Voir plus tard si besoin id (pour modifier les scores ?)
      for (let datas of tournamentDatas) {
        for (let team of datas.teams) {
          teamsPerTournament.push(team.name);
        }
      }

      // Génération des matchs
      const generated = generateRoundRobinMatchs(teamsPerTournament);

      res.send(generated);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Création d'un tournois
  create: async (req, res, next) => {
    try {
      // Peut être plus optimisé (moins d'appel à la BDD)
      const tournament = await Tournament.create(req.body);

      res.send(tournament);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Suppression d'un tournois
  delete: async (req, res, next) => {
    try {
      const tournamentId = req.params.id;
      const tournament = await Tournament.findByPk(tournamentId);

      if (!tournament) {
        return next();
      }

      await tournament.destroy();
      res.send("Tournoi supprimé avec succès");
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = tournamentController;
