const express = require("express");

const auth = require("./middlewares/auth");
const isAdmin = require("./middlewares/isAdmin");

const matchController = require("./controllers/matchController");
const teamController = require("./controllers/teamController");
const tournamentController = require("./controllers/tournamentController");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");

const router = express.Router();

// ========================
//          Match
// ========================

// Récupérer tous les matchs
router.get("/match", matchController.getAll); // Liste des matchs avec status "PENDING", je viens de générer les matchs
// Récupérer un match
router.get("/match/:id", matchController.getOne);
// Suppression d'un match
router.delete("/match/:id", auth, isAdmin, matchController.delete);
// Mise à jour des scores des matchs
router.put("/match/:id/score", auth, isAdmin, matchController.update);

// ========================
//          Team
// ========================

// Récupération de toutes les teams
router.get("/team", auth, teamController.getAll);
// Création d'une team
router.post("/team", auth, teamController.create);

router.get("/team/me", auth, teamController.getMyTeam);
// Récupération d'une team
router.get("/team/:id", teamController.getOne);
// Suppression d'une team
router.delete("/team/:id", auth, teamController.delete);

// ========================
//        Tournament
// ========================

// Récupérer tous les tournois, avec les informations de base et les teams associées
router.get("/tournament", auth, tournamentController.getAll);
// Créer un tournois
router.post("/tournament", auth, isAdmin, tournamentController.create);
// Récupérer un tournois précis, avec les matchs et les teams associées
router.get("/tournament/:id", auth, tournamentController.getOne);
// Supprimer un tournois
router.delete("/tournament/:id", auth, isAdmin, tournamentController.delete);
// Générer des matchs dans un tournois
router.post(
  "/tournament/:id/generate",
  auth,
  isAdmin,
  tournamentController.generateMatchs,
);
// Ajouter une team au tournois
router.post(
  "/tournament/:id/team",
  auth,
  isAdmin,
  tournamentController.addTeam,
);
// Supprimer une team d'un tournois
router.delete(
  "/tournament/:id/team/:teamid",
  auth,
  isAdmin,
  tournamentController.deleteTeam,
);
// Récupérer le classement des équipes
router.get("/tournament/:id/ranking", auth, tournamentController.getRanking);

// ========================
//           User
// ========================

// Récupérer tous les utilisateurs
router.get("/user", userController.getAll);
// Récupérer un utilisateur
router.get("/user/:id", auth, userController.getOne);
// Supprimer un utilisateur
router.delete("/user/:id", auth, userController.delete);
// Création d'un utilisateur
router.post("/signin", authController.signin);
// Vérification des infos pour se connecter
router.post("/login", authController.login);
// Récupérer les infos de l'utilisateur connecté
router.get("/whoiam", auth, authController.whoiam);
// Déconnexion
router.post("/logout", authController.logout);

module.exports = router;
