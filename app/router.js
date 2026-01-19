const express = require("express");

const matchController = require("./controllers/matchController");

const router = express.Router();

// Exemple de route
router.get("/match", matchController.getAll);

module.exports = router;
