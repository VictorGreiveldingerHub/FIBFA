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
            as: "partner",
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
      res.status(500).send({
        error: "Erreur lors de la récupération de toutes les équipes",
      });
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

      const team = await Team.findByPk(teamId, {
        include: [
          {
            model: Tournament,
            as: "tournaments",
            attributes: ["id", "name"],
            through: { attributes: [] }, // Evite de renvoyer la table de jointure
          },
        ],
      });

      // Team introuvable
      if (!team) {
        // 404
        return next();
      }

      res.send(team);
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération de l'équipe" });
    }
  },

  getMyTeam: async (req, res) => {
    try {
      const userId = req.session.user.id;

      const user = await User.findByPk(userId, {
        include: {
          model: Team,
          include: [
            {
              model: Tournament,
              as: "tournaments",
            },
            {
              model: User,
              as: "partner",
              attributes: ["id", "pseudo"],
            },
          ],
        },
      });

      // Si l'utilisateur n'a pas de team
      if (!user || !user.Team) {
        return res.send(null);
      }

      console.log(user);
      res.send(user.Team);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Erreur serveur" });
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

      const creator_id = req.session.user.id;

      // Si pas d'id créateur / coéquipié
      if (!creator_id || !teammate_id) {
        return res.status(400).send({ error: "Joueur introuvable" });
      }

      const newTeam = await Team.create({ name });

      const creator = await User.findByPk(creator_id);
      const teammate = await User.findByPk(teammate_id);

      if (!creator || !teammate) {
        return res.status(400).send({ error: "Joueur introuvable" });
      }

      // On passe l'id de la nouvelle team au créateur
      await creator.setTeam(newTeam);
      // On passe l'id de la nouvelle team au coéquipier
      await teammate.setTeam(newTeam);

      const fullTeam = await Team.findByPk(newTeam.id, {
        include: [
          {
            model: User,
            as: "partner",
            attributes: ["id", "pseudo"],
          },
        ],
      });

      res.send(fullTeam);
    } catch (error) {
      console.trace(error);
      res.status(500).send({ error: "Erreur lors de la création de l'équipe" });
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
      res
        .status(500)
        .send({ error: "Erreur lors de la suppression de l'équipe " });
    }
  },
};

module.exports = teamController;
