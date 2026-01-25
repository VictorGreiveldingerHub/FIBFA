const { Tournament, Match, Team, MatchTeam } = require("../models");

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

      // Je renvoie aussi le nombre de teams dans le tournois
      // Pour utiliser teamCount dans mon front
      // Si teamCount = 8, alors génération des match
      const result = tournaments.map((tournament) => ({
        ...tournament.toJSON(),
        teamCount: tournament.teams.length,
      }));

      res.send(result);
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
      const tournamentId = parseInt(req.params.id);

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

  // Création d'un tournois
  // Avec :
  // - le nom
  // - la date
  // - la description
  // Pour l'instant, l'id creator, une fois auth middleware mis en place, gérer ca avec user.id en session
  create: async (req, res, next) => {
    try {
      // const user = req.user;
      // if (user.status !== "ADMIN") {
      //   return res.status(403).send({ error: "Accès refusé" });
      // }

      // Ajouter l'id du creator une fois que auth est en place
      let { name, date, description, creator_id } = req.body;

      creator_id = 1; // A supprimer

      // Peut être plus optimisé (moins d'appel à la BDD)
      const tournament = await Tournament.create({
        name,
        date,
        description,
        creator_id,
      });

      res.send(tournament);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Suppression d'un tournois
  delete: async (req, res, next) => {
    try {
      // L'id du tournois
      const tournamentId = parseInt(req.params.id);

      const tournament = await Tournament.findByPk(tournamentId);
      // Tournois introuvable
      if (!tournament) {
        // => 404
        return next();
      }

      await tournament.destroy();
      res.send("Tournoi supprimé avec succès");
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Récupère les teams présentent dans un tournois, passe par une fonction de génération de match (round robin)
  // selon le tournois correspondant,
  // génère le tableau de match correspondant
  generateMatchs: async (req, res, next) => {
    try {
      // Si l'utilisateur n'est pas ADMIN
      // return res.status(403).send("Seul les administrateurs peuvent ajouter une team")

      const tournamentId = parseInt(req.params.id);

      // Création du tableau avec toutes les teams par championnat
      const teamsIdTournament = [];

      // Récupérer les infos d'un tournois
      const tournamentDatas = await Tournament.findByPk(tournamentId, {
        include: { model: Team, as: "teams" },
      });

      if (!tournamentDatas) {
        return next(); // 404
      }

      // Vérification si il existe deja des matchs avec un tournamentId,
      // Pour éviter de régénérer un tournois dejà généré
      const matchs = await Match.findAll({
        where: { tournament_id: tournamentId },
      });

      if (matchs.length > 0) {
        return res.send("Les matchs ont déjà été générés");
      }

      // On push l'id des teams dans le tableau de génération des matchs
      for (let team of tournamentDatas.teams) {
        teamsIdTournament.push(team.id);
      }

      // Pour l'instant, un tournois ne peut etre généré que lorsque 8 équipes sont inscrites
      // Plus tard, on pourra changer ça
      if (tournamentDatas.teams.length !== 8) {
        return res
          .status(400)
          .send("Pas assez d'équipe pour générer les matchs");
      }

      // Génération des matchs
      const matchsArray = generateRoundRobinMatchs(teamsIdTournament);
      const createdMatches = [];

      for (let match of matchsArray) {
        // Récupération des id des teams
        const [team_id_1, team_id_2] = match;

        // Création du match avec l'id du tournois auquel il appartient
        const newMatch = await Match.create({
          tournament_id: tournamentId,
        });

        // Via la table de liaison Sequelize => bulkCreaete
        // score mis en place à 0
        await MatchTeam.bulkCreate([
          {
            match_id: newMatch.id,
            team_id: team_id_1,
            team_position: 0,
            score: 0,
          },
          {
            match_id: newMatch.id,
            team_id: team_id_2,
            team_position: 1,
            score: 0,
          },
        ]);

        createdMatches.push(newMatch);
      }

      res.send(createdMatches);
    } catch (error) {
      console.trace(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  },

  /**
   * Ajout d'une team dans le tournois
   * Disponible uniquement pour l'admin,
   * Il voit dans la liste des teams disponible de chaque tournois, les teams qui peuvent y participer
   * Et les ajoute au tournois
   */
  addTeam: async (req, res, next) => {
    try {
      // Si l'utilisateur n'est pas ADMIN
      // return res.status(403).send("Seul les administrateurs peuvent ajouter une team")

      const tournamentId = parseInt(req.params.id);
      const teamId = parseInt(req.body.team_id);

      const tournament = await Tournament.findByPk(tournamentId, {
        include: {
          model: Team,
          as: "teams",
        },
      });

      // Pas de tournois
      if (!tournament) {
        return next(); //404
      }

      // Si la team est deja dans le tournois => 400
      if (tournament.teams.some((team) => team.id === teamId)) {
        return res.status(400).send("Equipe déja présente dans le tournois");
      }

      const team = await Team.findByPk(teamId);

      // Pas d'équipe
      if (!team) {
        return next(); // 404
      }

      // Ajout de l'équipe au tournois
      await tournament.addTeam(team);

      res.send({
        tournamentId,
        teamId,
      });
    } catch (error) {
      console.trace(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  },

  /**
   * Récupération de tous les matchs "COMPLETE" associés au tournois correspondant
   * Calcul des scores de chaque équipe
   * Renvoie le classement ASC
   */
  getRanking: async (req, res, next) => {
    try {
      const tournamentId = parseInt(req.params.id);

      // Récupérer tous les matchs "COMPLETE" du tournois,
      const completedMatchs = await Match.findAll({
        where: { tournament_id: tournamentId, status: "COMPLETE" },
        include: {
          model: Team,
          as: "teams",
          through: {
            attributes: ["score"], // récupère score
          },
        },
      });

      // Classement
      const ranking = {};

      for (const match of completedMatchs) {
        const [team1, team2] = match.teams;

        // Initialisation si la team n'existe pas encore dans le classement
        if (!ranking[team1.id]) {
          ranking[team1.id] = {
            team: team1,
            points: 0,
          };
        }

        if (!ranking[team2.id]) {
          ranking[team2.id] = {
            team: team2,
            points: 0,
          };
        }

        // Récupération des scores
        const team1Score = team1.MatchTeam.score;
        const team2Score = team2.MatchTeam.score;

        // Comparatif,
        // Match gagné = 3 points
        // Ex aequo = 1 point
        // Défaite = 0 point
        if (team1Score > team2Score) {
          ranking[team1.id].points += 3;
        } else if (team1Score < team2Score) {
          ranking[team2.id].points += 3;
        } else if (team1Score === team2Score) {
          ranking[team1.id].points += 1;
          ranking[team2.id].points += 1;
        }
      }

      // Tri
      const rankingArray = [...ranking].sort((a, b) => b.points - a.points);

      res.send(rankingArray);
    } catch (error) {
      console.trace(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  },

  // Supprime une team du tournois
  deleteTeam: async (req, res, next) => {
    try {
      const tournamentId = parseInt(req.params.id);
      const teamId = parseInt(req.params.teamid);

      const tournament = await Tournament.findByPk(tournamentId);

      if (!tournament) {
        return next();
      }

      // Récupération de la team correspondante
      const team = await Team.findByPk(teamId);

      if (!team) {
        return next();
      }
      // Via l'asso belongsToMany <-> belongsToMany de sequelize
      await tournament.removeTeam(team);

      res.send("Team supprimée du tournois");
    } catch (error) {
      console.trace(error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  },
};

module.exports = tournamentController;
