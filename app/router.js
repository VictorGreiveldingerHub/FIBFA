const express = require("express");

const matchController = require("./controllers/matchController");
const teamController = require("./controllers/teamController");
const tournamentController = require("./controllers/tournamentController");
const userController = require("./controllers/userController");

const router = express.Router();

// =====
// Match
// =====

router.get("/match", matchController.getAll);
router.get("/match/:id", matchController.getOne);

// ====
// Team
// ====

router.get("/team", teamController.getAll);
router.post("/team", teamController.create);

// ==========
// Tournament
// ==========

// Récupérer tous les tournois, avec les informations de base et les teams associées
router.get("/tournament", tournamentController.getAll);
// Créer un tournois
router.post("/tournament", tournamentController.create);
// Récupérer un tournois précis, avec les matchs et les teams associées
router.get("/tournament/:id", tournamentController.getOne);
// Supprimer un tournois
router.delete("/tournament/:id", tournamentController.delete);
// Génération de matchs par tournois
router.get("/tournament/:id/generate", tournamentController.generate);

// ====
// User
// ====

router.get("/user", userController.getAll);

module.exports = router;
