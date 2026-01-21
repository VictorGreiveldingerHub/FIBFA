const express = require("express");

const matchController = require("./controllers/matchController");
const teamController = require("./controllers/teamController");
const tournamentController = require("./controllers/tournamentController");
const userController = require("./controllers/userController");

const router = express.Router();

router.get("/match/:id", matchController.getOne);
router.get("/match", matchController.getAll);

router.get("/team", teamController.getAll);
router.post("/team", teamController.create);

// Récupérer tous les tournois, avec les informations de base et les teams associées
router.get("/tournament", tournamentController.getAll);

router.get("/tournament/:id/generate", tournamentController.generate);
// Récupérer un tournois précis, avec les matchs et les teams associées
router.get("/tournament/:id", tournamentController.getOne);

// Créer un tournois
router.post("/tournament", tournamentController.create);
// Supprimer un tournois
router.delete("/tournament/:id", tournamentController.delete);

router.get("/user", userController.getAll);

module.exports = router;
