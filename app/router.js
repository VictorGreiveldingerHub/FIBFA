const express = require("express");

const auth = require("./middlewares/auth");
const isAdmin = require("./middlewares/isAdmin");

const matchController = require("./controllers/matchController");
const teamController = require("./controllers/teamController");
const tournamentController = require("./controllers/tournamentController");
const userController = require("./controllers/userController");

const router = express.Router();

// ========================
//          Match
// ========================

// Récupérer tous les matchs
router.get("/match", matchController.getAll); // Liste des matchs avec status "PENDING", je viens de générer les matchs
// Récupérer un match
router.get("/match/:id", matchController.getOne);
// Suppression d'un match
router.delete("/match/:id", matchController.delete);
// Mise à jour des scores des matchs
router.put("/match/:id/score", matchController.update);

// ========================
//          Team
// ========================

// Récupération de toutes les teams
router.get("/team", teamController.getAll);
// Création d'une team
router.post("/team", teamController.create);
// Récupération d'une team
router.get("/team/:id", teamController.getOne);
// Suppression d'une team
router.delete("/team/:id", teamController.delete);

// ========================
//        Tournament
// ========================

// Récupérer tous les tournois, avec les informations de base et les teams associées
router.get("/tournament", tournamentController.getAll);
// Créer un tournois
router.post("/tournament", tournamentController.create);
// Récupérer un tournois précis, avec les matchs et les teams associées
router.get("/tournament/:id", tournamentController.getOne);
// Supprimer un tournois
router.delete("/tournament/:id", tournamentController.delete);
// Générer des matchs dans un tournois
router.post("/tournament/:id/generate", tournamentController.generateMatchs);
// Ajouter une team au tournois
router.post("/tournament/:id/team", tournamentController.addTeam);
// Supprimer une team d'un tournois
router.delete("/tournament/:id/team/:teamid", tournamentController.deleteTeam);
// Récupérer le classement des équipes
router.get("/tournament/:id/ranking", tournamentController.getRanking);

// ========================
//           User
// ========================

// Récupérer tous les utilisateurs
router.get("/user", userController.getAll);
// Création d'un utilisateur
router.post("/user/signup", userController.create);
// Vérification des infos pour se connecter
router.post("/user/login", userController.login);
// Récupérer un utilisateur
router.get("/user/:id", userController.getOne);
// Supprimer un utilisateur
router.delete("/user/:id", userController.delete);

module.exports = router;
