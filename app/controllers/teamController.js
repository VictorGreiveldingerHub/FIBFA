const { Team, User, Match, Tournament } = require("../models"); // Pour avoir les associations dispos

const teamController = {
  /**
   * Récupération de toutes les teams
   * Associé avec :
   * - les utilisateurs
   * - les matchs
   * - les tournois
   * */
  getAll: async (req, res, next) => {
    try {
      // Récupération de toutes les données relative à une team
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

      // Team introuvable
      if (!teams) {
        // 404
        return next();
      }

      res.send(teams);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  /**
   * Récupération d'une team
   * Associé avec :
   * - l'id recherché
   * */
  getOne: async (req, res, next) => {
    try {
      const teamId = parseInt(req.params.id);

      const team = await Team.findByPk(teamId);

      // Team introuvable
      if (!team) {
        // 404
        return next();
      }

      res.send(team);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  /**
   * Création d'une nouvelle team
   * Associé avec :
   * - le nom de la team
   * - l'id du createur
   * - l'id du coéquipier (ici, une team est forcément constituée de 2 utilisateurs)
   * */
  create: async (req, res, next) => {
    try {
      // Récupération du nom et id team mate
      const { name, teammate_id } = req.body;

      const creator_id = 18; // req.user.id; // Une fois que mon auth est en place

      // Si pas d'id créateur / coéquipié
      if (!creator_id || !teammate_id) {
        return res.status(400).send("Joueur introuvable");
      }

      const newTeam = await Team.create({ name });

      const creator = await User.findByPk(creator_id);
      const teammate = await User.findByPk(teammate_id);

      if (!creator || !teammate) {
        return res.status(400).send("Joueur introuvable");
      }

      // On passe l'id de la nouvelle team au créateur
      await creator.setTeam(newTeam);
      // On passe l'id de la nouvelle team au coéquipier
      await teammate.setTeam(newTeam);

      res.send(newTeam);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Suppression d'une team
  delete: async (req, res, next) => {
    try {
      // L'id de la team
      const teamId = parseInt(req.params.id);

      const team = await Team.findByPk(teamId);

      // TEam introuvable
      if (!team) {
        // 404
        return next();
      }

      // Si la team existe alors suppression
      await team.destroy();

      res.send("Team supprimée avec succès");
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = teamController;
