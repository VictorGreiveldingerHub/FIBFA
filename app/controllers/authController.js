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

      req.session.user = {
        id: newUser.id,
        pseudo: newUser.pseudo,
        role: newUser.status,
      };

      res.send(req.session.user);
    } catch (error) {
      console.trace(error);
      res.status(500).send({ error: "Une erreur s'est produite" });
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

  // Pour gérer l'utilisateur une fois connecté
  whoiam: async (req, res, next) => {
    try {
      res.send(req.session.user);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Déconnexion
  logout: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .send({ error: "Erreur lors de la déconnexion" });
        }

        res.clearCookie("sid");

        res.send({ message: "Déconnecté" });
      });
    } catch (error) {
      console.trace(error);
      res.status(500).send({ error: "Erreur lors de la déconnexion" });
    }
  },
};

module.exports = authController;
