const { User } = require("../models");
const bcrypt = require("bcrypt");

const authController = {
  /**
   * Création d'un utilisateur
   * Avec :
   * - le pseudo (unique, gérer via bdd + seqeulize)
   * - email
   * - password, qui sera hashé (bcrypt)
   */
  signin: async (req, res, next) => {
    try {
      // Les données du formulaire
      const { pseudo, email, password } = req.body;

      // Hashage du mdp
      const hashedPassword = await bcrypt.hash(password, 10); // 10 = saltRounds

      // Création de l'utilisateur avec le nouveau mdp
      const newUser = await User.create({
        pseudo,
        email,
        password: hashedPassword,
      });

      res.send(newUser);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
  /**
   * Vérification des données pour connecter un utilisateur
   * Avec :
   * - email
   * - password, comparé en bdd
   */
  login: async (req, res, next) => {
    try {
      console.log(req.headers.cookie);
      // Les données du form
      const { email, password } = req.body;
      // Récupération de l'utilisateur via email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        // Pas d'utilisateur = 404
        return next();
      }

      // On compare le mot de passe envoyé avec le hash en BDD
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).send({ error: "Mot de passe incorrect" });
      }

      req.session.user = {
        id: user.id,
        pseudo: user.pseudo,
        role: user.status,
      };

      res.send(req.session.user);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  /**
   * Suppression d'un utilisateur
   * Avec :
   * - l'id de l'utilisateur
   */
  logout: async (req, res, next) => {
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
      res.status(500).send(error);
    }
  },
};

module.exports = authController;
