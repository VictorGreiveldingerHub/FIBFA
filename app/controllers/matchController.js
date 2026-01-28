const { Match, Team, MatchTeam } = require("../models");

const matchController = {
  // Méthode de récupération de tous les matchs
  // Avec :
  // - les teams associées
  //  - leur position
  //  - et lerr score
  getAll: async (req, res) => {
    try {
      const matchs = await Match.findAll({
        include: {
          model: Team,
          as: "teams",
          through: {
            attributes: ["team_position", "score"], // récupère score et position
          },
        },
      });

      res.send(matchs);
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération des matches" });
    }
  },

  // Méthode de récupération d'un match
  // Avec :
  // - les teams associées
  //  - leur position
  //  - et lerr score
  //  - et leur date de création / modification
  getOne: async (req, res, next) => {
    try {
      const matchId = parseInt(req.params.id);

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
        // 404
        return next();
      }

      res.send(match);
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération du matche" });
    }
  },

  /**
   * Suppression d'un match
   */
  delete: async (req, res, next) => {
    try {
      const matchId = parseInt(req.params.id);

      const matchToDelete = await Match.findByPk(matchId);

      if (!matchToDelete) {
        return next();
      }

      matchToDelete.destroy();

      res.send(`Match ${matchId} supprimé`);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Modifier le score d'un match et passe son status a "COMPLETE"
  // Pour gérer le classement par la suite
  update: async (req, res, next) => {
    try {
      const matchId = parseInt(req.params.id);
      // Les scores
      const { team1Score, team2Score } = req.body;

      // Récupérer les deux équipes du match
      const matchTeams = await MatchTeam.findAll({
        where: { match_id: matchId },
      });

      // Si le compte des équipes != 2
      if (matchTeams.length !== 2) {
        return res.status(400).send("Match incomplet ou inexistant");
      }

      // On update les scores
      await matchTeams[0].update({ score: team1Score });
      await matchTeams[1].update({ score: team2Score });

      // On passe le match à fini
      await Match.update({ status: "COMPLETE" }, { where: { id: matchId } });

      res.send("Score mis à jour", matchTeams);
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour des scores" });
    }
  },
};

module.exports = matchController;
