const { User } = require("../models");
const bcrypt = require("bcrypt");

const userController = {
  /**
   * Récupération de tous les utilisateurs
   */
  getAll: async (req, res, next) => {
    try {
      const users = await User.findAll();

      // Utilisateurs introuvables
      if (!users) {
        // 404
        return next();
      }

      res.send(users);
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération des utilisateus" });
    }
  },

  /**
   * Récupération d'un utilisateur
   * Avec :
   * - l'id de l'utilisateur
   */
  getOne: async (req, res, next) => {
    try {
      // Id de l'utilisateur
      const userId = parseInt(req.params.id);

      const user = await User.findByPk(userId);

      // Utilisateur introuvable
      if (!user) {
        // 404
        return next();
      }
      res.send(user);
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
  },

  /**
   * Suppression d'un utilisateur
   * Avec :
   * - l'id de l'utilisateur
   */
  delete: async (req, res, next) => {
    try {
      // Id de l'utilisateur
      const userId = parseInt(req.params.id);

      const user = await User.findByPk(userId);

      if (!user) {
        // 404
        return next();
      }

      await user.destroy();

      res.send("Utilisateur supprimé avec succès");
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .send({ error: "Erreur lors de la suppression de lu'itlisateur" });
    }
  },
};

module.exports = userController;
